const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.insertDetails = (firstName, lastName, emailadress, hashedPW) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id`,
        [firstName, lastName, emailadress, hashedPW]
    );
};

module.exports.getHashAndIdByEmail = (email) => {
    return db.query(`SELECT password, id FROM users WHERE email = ($1)`, [
        email,
    ]);
};

module.exports.verifyEmail = (email) => {
    return db.query(`SELECT email, id FROM users WHERE email = ($1)`, [email]);
};

module.exports.insertResetCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code)
        VALUES($1, $2)`,
        [email, code]
    );
};

module.exports.verifyCode = (code) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE code = ($1) AND  CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`,
        [code]
    );
};

module.exports.updatePassword = (hash, email) => {
    return db.query(
        `UPDATE users
SET password=($1)
WHERE email = ($2)
 RETURNING id`,
        [hash, email]
    );
};

module.exports.getProfileData = (id) => {
    return db.query(
        `SELECT id, first, last, email, url, bio FROM users WHERE id=($1)`,
        [id]
    );
};

module.exports.updateProfilPicture = (url, id) => {
    return db.query(`UPDATE users SET url=($1) WHERE id =($2)`, [url, id]);
};

module.exports.updateBio = (bio, id) => {
    return db.query(`UPDATE users SET bio=($1) WHERE id =($2)`, [bio, id]);
};
