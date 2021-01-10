  DROP TABLE IF EXISTS users cascade;
  
  CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL CHECK (first != ''),
      last VARCHAR(255) NOT NULL CHECK (last != ''),
      password VARCHAR(255) NOT NULL CHECK (password != ''),
      email VARCHAR(255) NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
      url VARCHAR(255),
      bio VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

INSERT INTO users(first, last, email, password, url) VALUES ('Hannah', 'Arendt', 'ha@web.de', '1', 'https://femmessavantes2.pressbooks.com/app/uploads/sites/36475/2015/09/Hannah-Arendt-460x583.jpg');