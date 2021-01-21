DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
);


INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 2, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 4, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 5, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 6, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 7, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 8, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 9, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 10, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (3, 11, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (11, 3, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (12, 3, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (13, 3, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (14, 3, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (15, 3, false);


INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 2, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 114, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 5, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 6, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 7, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 8, true);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 9, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 10, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (4, 11, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (11, 4, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (12, 4, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (13, 4, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (14, 4, false);
INSERT INTO friendships(sender_id, recipient_id, accepted ) VALUES (15, 4, false);
