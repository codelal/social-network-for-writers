DROP TABLE IF EXISTS workspace_drawings;

CREATE TABLE workspace_drawings(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  drawing_url VARCHAR NOT NULL CHECK (drawing_url != ''),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
