const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.getFriendshipStatus = (otherUserId, userId) => {
    return db.query(
        `SELECT * FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`,
        [otherUserId, userId]
    );
};

module.exports.insertForFriendRequest = (userId, otherUserId) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES($1, $2, TRUE)`[
            (userId, otherUserId)
        ]
    );
};




