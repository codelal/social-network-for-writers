DROP TABLE IF EXISTS chat_messages;

CREATE TABLE chat_messages(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  message VARCHAR(1000),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht1');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht2');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht1');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht3');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht5');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht6');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht7');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht8');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht9');
INSERT INTO chat_messages (user_id, message) VALUES (1, 'Ich bin Testnachricht10');
INSERT INTO chat_messages (user_id, message) VALUES (2, 'Ich bin Testnachricht1');
INSERT INTO chat_messages (user_id, message) VALUES (2, 'Ich bin Testnachricht2');