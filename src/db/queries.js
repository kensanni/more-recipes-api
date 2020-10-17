const createUserTableQuery = `
  CREATE TYPE IF NOT EXISTS roles AS ENUM ('user', 'admin', 'superAdmin');
  CREATE TABLE IF NOT EXISTS users
  (id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL
    CHECK(length(name) > 0),
  username VARCHAR(50) UNIQUE NOT NULL
    CHECK(length(username) > 0),
  email VARCHAR(50) UNIQUE NOT NULL
    CHECK(length(email) > 0), 
  password VARCHAR(255) NOT NULL
    CHECK(length(password) > 0),
  role roles default 'user',
  image VARCHAR(255) NOT NULL
    CHECK(length(image) > 0),
  created_on DATE NOT NULL
  )`;

const createRecipesTableQuery = `
  CREATE TABLE IF NOT EXISTS recipes (
  id serial PRIMARY KEY,
  user_id int NOT NULL,
  name VARCHAR(50) NOT NULL CHECK(length(name) > 0),
  description TEXT NOT NULL CHECK(length(description) > 0),
  ingredients TEXT[] NOT NULL,
  views INT default '0',
  image VARCHAR(255) NOT NULL CHECK(length(image) > 0),
  created_on DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
  )`;

const createRecipesQuery = `INSERT INTO
  recipes(user_id, name, description, ingredients, image, created_on)
  VALUES($1, $2, $3, $4, $5, $6)
  returning *`;

const createUserQuery = `INSERT INTO
  users(name, username, email, image, password, created_on)
  VALUES($1, $2, $3, $4, $5, $6)
  returning *`;

const signInUserQuery = 'SELECT * FROM users where ((email = $1) OR (username = $1))';


export {
  createUserTableQuery,
  createRecipesTableQuery,
  createUserQuery,
  signInUserQuery,
  createRecipesQuery
}