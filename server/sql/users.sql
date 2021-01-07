  DROP TABLE IF EXISTS users cascade;
  
  CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL CHECK (first != ''),
      last VARCHAR(255) NOT NULL CHECK (last != ''),
      email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
      password VARCHAR(255) NOT NULL,
      url VARCHAR(255),
      bio VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

INSERT INTO users(first, last, email, password, url) VALUES ('Anna', 'Schmidt', 'anna@web.de', 'anna', 'https://femmessavantes2.pressbooks.com/app/uploads/sites/36475/2015/09/Hannah-Arendt-460x583.jpg');