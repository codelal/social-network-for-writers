DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
);


INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (1, 10, false);

INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (11, 1, false);

INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (1, 12, true);

INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (13, 1, true);
