DROP TABLE IF EXISTS friendships

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES user(id) NOT NULL
    recipient_id INT REFERENCES user(id) NOT NULL
    accepted BOOLEAN DEFAULT false
)

SELECT * FROM friendshipsWHERE (recipient_id = §1 AND sender_id =$2) OR  (recipient_id = $2 AND sender_id = $3)