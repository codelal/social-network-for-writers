DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
);


INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (1, 2, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 1, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (1, 4, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (5, 1, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (1, 6, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (7, 1, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (1, 8, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (9, 1, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (10, 1, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (11, 1, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (12, 1, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (13, 1, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (14, 1, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (15, 1, false);
