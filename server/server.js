const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
}); //here include url, if I deploy to f.e. heroku

const compression = require("compression");
const csurf = require("csurf");
const path = require("path");
const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");
const db = require("./db");
const dbfriends = require("./dbfriends");
const dbworkspace = require("./dbworkspace");

const btn = require("./getButtonText");
const ses = require("./ses");
const s3 = require("./s3");
const multer = require("multer");
const config = require("./config.json");
const uidSafe = require("uid-safe");
const cryptoRandomString = require("crypto-random-string");

app.use(compression());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: `pure being and pure nothing are the same.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, //1Mb
    },
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/api/registration", function (req, res) {
    const { first, last, email, password } = req.body;
    //console.log(first, last, email, password);

    if (first && last && password && email) {
        hash(password)
            .then((hash) => {
                db.insertDetails(first, last, email, hash)
                    .then(({ rows }) => {
                        req.session.userId = rows[0].id;
                        res.json({ success: true });
                    })
                    .catch(function (err) {
                        if (err.constraint == "users_email_key") {
                            //console.log("this email already exists");
                            res.json({
                                success: false,
                                error: "email already exists",
                            });
                        } else if (err.constraint == "users_email_check") {
                            console.log("this is not a valid email");
                            res.json({
                                success: false,
                                error: "no valid emailformat",
                            });
                        } else {
                            res.json({ success: false });
                            console.log("error in db.insertDetails", err);
                        }
                    });
            })
            .catch((err) => {
                console.log("error in hash", err);
                res.json({ success: false });
            });
    } else {
        // console.log("empty input");
        res.json({ success: false, error: "empty input" });
    }
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    //console.log("post/ login", email, password);
    if (email && password) {
        db.getHashAndIdByEmail(email)
            .then((hash) => {
                //console.log("hash", hash.rows[0].password);
                compare(password, hash.rows[0].password)
                    .then((response) => {
                        if (response) {
                            req.session.userId = hash.rows[0].id;
                            //console.log("req.session.userId", req.session.userId);
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch((err) => {
                        console.log("error in compare", err);
                        res.json({ success: false });
                    });
            })
            .catch((err) => {
                console.log("error in getHashAndIdByEmail", err);
                res.json({ success: false });
            });
    } else {
        console.log("empty input");
        res.json({ success: false, error: "empty input" });
    }
});

app.post("/api/reset/password", (req, res) => {
    const { email } = req.body;
    console.log("post/ reset-password", email);
    db.verifyEmail(email)
        .then(({ rows }) => {
            // console.log(rows);
            if (rows[0].email === email) {
                //console.log("email exists");
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                // console.log("secretCode", secretCode);
                db.insertResetCode(email, secretCode)
                    .then(() => {
                        //console.log("insertResetCode", res);
                        ses.sendEmail(
                            "al.klein@posteo.de",
                            `Please enter the following Code: ${secretCode}`,
                            "here is the code to reset your password"
                        );
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("error in insertResetCode", err);
                        res.json({ success: false });
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("error in verifyEmail", err);
            res.json({ success: false });
        });
});

app.post("/api/reset/password/verify", (req, res) => {
    const { code, password } = req.body;
    // console.log("post/ reset/password/verify", code, password);
    db.verifyCode(code)
        .then(({ rows }) => {
            //console.log("res verifyCode", rows, rows[0].code);
            if (rows[0].code === code) {
                // console.log("code matched");
                // console.log("email + pw", rows[0].email, password);
                hash(password)
                    .then((hash) => {
                        db.updatePassword(hash, rows[0].email)
                            .then(({ rows }) => {
                                //console.log("pw updated", rows);
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("error in updatePassword", err);
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log("error in hash PW", err);
                        res.json({ success: false });
                    });
            } else {
                console.group("no code matched");
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("error in verifyEmail", err);
            res.json({ success: false });
        });
});

app.get("/api/profile/", (req, res) => {
    db.getProfileData(req.session.userId)
        .then(({ rows }) => {
            //console.log("rows in getProfileData", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in getProfileData", err);
            res.json({ success: false });
        });
});

app.post("/api/upload", uploader.single("file"), s3.upload, (req, res) => {
    //console.log("post upload");
    const url = `${config.s3Url}${req.file.filename}`;
    //console.log(url);
    db.updateProfilPicture(url, req.session.userId)
        .then(() => {
            //console.log("updateProfilPicture is done");
            res.json({ success: true, url: url });
        })
        .catch((err) => {
            console.log("error in updateProfilPicture", err);
            res.json({ success: false });
        });
});

app.post("/api/update/bio", (req, res) => {
    const { bio } = req.body;
    //console.log("update/bio, bio", req.body, bio);

    db.updateBio(bio, req.session.userId)
        .then(({ rows }) => {
            //console.log("updateBio worked", rows);
            res.json({ success: true, bio: bio });
        })
        .catch((err) => {
            console.log("error in updateProfilPicture", err);
            res.json({ success: false });
        });
});

app.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    // console.log(id);
    //console.log("get request api user id");
    db.getProfileData(id)
        .then(({ rows }) => {
            //   console.log("rows in getProfileData", rows, rows[0].first);
            res.json({
                success: true,
                first: rows[0].first,
                last: rows[0].last,
                email: rows[0].email,
                url: rows[0].url,
                bio: rows[0].bio,
                loggedInId: req.session.userId,
            });
        })
        .catch((err) => {
            console.log("error in getProfileData", err);
            if (err == "Cannot read property 'first' of undefined") {
                res.json({
                    success: false,
                    error: "this user doesn't existes",
                });
            } else {
                res.json({
                    success: false,
                });
            }
        });
});

app.get("/api/latest-users", (req, res) => {
    // console.log("api/latest-users request");
    db.getRecentlyRegisteredUsers()
        .then(({ rows }) => {
            //  console.log("rows from getRecentlyRegisteredUsers", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in getRecentlyRegisteredUsers", err);
            res.json({
                success: false,
            });
        });
});

app.get("/api/find-users/:input", (req, res) => {
    const { input } = req.params;

    db.findUsers(input)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in findUsers", err);
            res.json({
                success: false,
            });
        });
});

app.get("/api/friendship-status/:otherUserId", (req, res) => {
    const { otherUserId } = req.params;

    dbfriends
        .getFriendshipStatus(req.session.userId, otherUserId)
        .then(({ rows }) => {
            console.log("getFriendshipStatus", rows);
            const selectedButtontext = btn.friendshipStatusToButtonText(
                rows,
                req.session.userId,
                btn.BUTTON_TEXT
            );
            res.json({ success: true, text: selectedButtontext });
        })
        .catch((err) => {
            console.log("error getFriendshipStatus", err);
            res.json({
                success: false,
            });
        });
});

app.post("/api/friendship-action/", (req, res) => {
    console.log("/api/friendship-action runs");
    const { button, otherUserId } = req.body;
    console.log(button, otherUserId);
    parseInt(otherUserId);
    console.log(otherUserId);

    if (button == btn.BUTTON_TEXT.MAKE_REQUEST) {
        dbfriends
            .insertForFriendRequest(req.session.userId, otherUserId)
            .then(() => {
                res.json({
                    success: true,
                    text: btn.BUTTON_TEXT.CANCEL_REQUEST,
                });
            })
            .catch((err) => {
                console.log("insertForFriendRequest", err);
                res.json({
                    success: false,
                });
            });
    } else if (button == btn.BUTTON_TEXT.ACCEPT_REQUEST) {
        dbfriends
            .acceptFriendRequest(req.session.userId, otherUserId)
            .then(() => {
                res.json({
                    success: true,
                    text: btn.BUTTON_TEXT.UNFRIEND,
                });
            })
            .catch((err) => {
                console.log("acceptFriendRequest", err);
                res.json({
                    success: false,
                });
            });
    } else if (
        button == btn.BUTTON_TEXT.CANCEL_REQUEST ||
        btn.BUTTON_TEXT.UNFRIEND
    ) {
        dbfriends
            .cancelRequestOrUnfriend(req.session.userId, otherUserId)
            .then(() => {
                res.json({ success: true, text: btn.BUTTON_TEXT.MAKE_REQUEST });
            })
            .catch((err) => {
                console.log("cancelRequestOrUnfriend", err);
                res.json({
                    success: false,
                });
            });
    }
});

app.get("/api/friends", (req, res) => {
    console.log("api/friends request works");
    dbfriends
        .getFriends(req.session.userId)
        .then(({ rows }) => {
            //   console.log("rows from getFriendsAndWannabes", rows);
            res.json({ userId: req.session.userId, rows });
            //res.json(rows);
        })
        .catch((err) => {
            console.log("getFriendsAndWannabes", err);
            res.json({
                success: false,
            });
        });
});

app.post("/api/whiteboard", (req, res) => {
    console.log("/api/whiteboard runs");
    const { drawingUrl } = req.body;
  
    dbworkspace
        .insertDrawingUrl(req.session.userId, drawingUrl)
        .then(({ rows }) => {
            console.log("rows in insertDrawingUrl", rows);
        })
        .catch((err) => {
            console.log("error in insertDrawingUrl", err);
            res.json({
                success: false,
            });
        });
});

//redirecting

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/logout", (req, res) => {
    req.session.userId = false;
    res.redirect("/api/registration");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        // NEVER COMMENT THIS LINE OUT EVER EVER EVER EVER
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", (socket) => {
    console.log(`Socker with id ${socket.id} has connected`);
    const userId = socket.request.session.userId;

    socket.on("chat message", (message) => {
        db.insertChatMessages(userId, message)
            .then(({ rows }) => {
                const messagesId = rows[0].id;
                const timestamp = rows[0].timestamp;
                db.getProfileData(userId)
                    .then(({ rows }) => {
                        console.log("rows getProfileData", rows);
                        io.sockets.emit("message and user data", {
                            message: message,
                            userId: userId,
                            id: messagesId,
                            first: rows[0].first,
                            last: rows[0].last,
                            url: rows[0].url,
                            timestamp: timestamp,
                        });
                    })
                    .catch((err) =>
                        console.log("error in socket getProfileData", err)
                    );
            })
            .catch((err) => console.log("error in insertChatMessages", err));
    });

    db.getRecentMessages(userId)
        .then(({ rows }) => {
            const reversedMessages = rows.reverse();
            socket.emit("ten most recent messages", reversedMessages);
        })
        .catch((err) => console.log("error in getRecentMessages", err));

    socket.on("canvas drawing", (drawingUrl) => {
        dbworkspace
            .insertDrawingUrl(userId, drawingUrl)
            .then(({ rows }) => {
                console.log("rows in insertDrawingUrl", rows);
                io.broadcast.emit("canvas drawing", {
                     drawingUrl:  drawingUrl
            });
    });

    socket.on("Disconnect", () => {
        console.log(`Socker with id ${socket.id} has disconnected`);
    });
});
