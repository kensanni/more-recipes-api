import pool from './pool';

pool.on('connect', () => {
  console.log('database connected')
})

const createUserTable = () => {
  
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

  pool.query(createUserTableQuery).then((res) => {
    console.log(res);
    pool.end()
  });

};

const dropUserTable = () => {
  const dropUserTableQuery = 'DROP TABLE IF EXISTS users';

  pool.query(dropUserTableQuery).then((res) => {
    console.log(res);
    pool.end();
  });

};

const createRecipesTable = () => {
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
  
  pool.query(createRecipesTableQuery).then((res) => {
    console.log(res);
    pool.end()
  });
  
}

const dropRecipesTable = () => {
  const dropRecipesTableQuery = 'DROP TABLE IF EXISTS recipes';

  pool.query(dropRecipesTableQuery).then((res) => {
    console.log(res);
    pool.end();
  });

};

const createAllTables = () => {
  createUserTable();
  createRecipesTable();
};

const dropAllTables = () => {
 dropUserTable();
 dropRecipesTable();
};



export {
  createAllTables,
  dropAllTables
};

require('make-runnable');
