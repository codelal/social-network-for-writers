const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");
const db = require("./db");

app.use(compression());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

app.use(
    cookieSession({
        secret: `pure being and pure nothing are the same.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/registration", function (req, res) {
    const { first, last, email, password } = req.body;
    console.log(first, last, email, password);
    if ((first, last, email, password)) {
        //console.log("ja");
        hash(password)
            .then((hash) => {
                db.insertDetails(first, last, email, hash)
                    .then(({ rows }) => {
                        // console.log("rows[0].id", rows, rows[0].id, rows);
                        req.session.userId = rows[0].id;
                        res.json(rows);
                    })
                    .catch(function (err) {
                        console.log("error in db.insertDetails", err);
                    });
            })
            .catch((err) => {
                console.log("there is an error in hash", err);
            });
    } else {
        console.log("no insert");
        res.json({ sucess: false });
    }
});

//redirecting

app.get("/welcome", (req, res) => {
    // if the user IS logged in
    if (req.session.userId) {
        // they shouldn't be allowed to see /welcome!!!!
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("*", function (req, res) {
    // if the user is NOT logged in
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        // NEVER COMMENT THIS LINE OUT EVER EVER EVER EVER
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
