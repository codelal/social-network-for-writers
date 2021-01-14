const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.getFriendshipStatus = (userId, otherUserId) => {
    return db.query(
        `SELECT * FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) ORDER BY id`,
        [otherUserId, userId]
    );
};

module.exports.insertForFriendRequest = (userId, otherUserId) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES($1, $2)`,
        [userId, otherUserId]
    );
};

module.exports.acceptFriendRequest = (userId, otherUserId) => {
    return db.query(
        `UPDATE friendships SET accepted=true WHERE recipient_id = $1 AND sender_id = $2 RETURNING accepted`,
        [userId, otherUserId]
    );
};

module.exports.cancelRequestOrUnfriend = (userId, otherUserId) => {
    return db.query(
        `DELETE FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)`,
        [otherUserId, userId]
    );
};
