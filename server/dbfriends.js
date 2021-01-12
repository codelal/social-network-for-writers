const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);


SELECT * FROM friendships WHERE (recipient_id = §1 AND sender_id =$2) OR  (recipient_id = $2 AND sender_id = $3)