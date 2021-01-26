DROP TABLE IF EXISTS workspace_text;

CREATE TABLE workspace_text(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  text VARCHAR NOT NULL CHECK (text != ''),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
