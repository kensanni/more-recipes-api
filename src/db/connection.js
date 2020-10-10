import pool from './pool';

pool.on('connect', () => {
  console.log('database connected')
})

const createUserTable = () => {
  
  const createUserTableQuery = `
    CREATE TYPE roles AS ENUM ('user', 'admin', 'superAdmin');
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


const createAllTables = () => {
  createUserTable();
};

const dropAllTables = () => {
 dropUserTable();
};



export {
  createAllTables,
  dropAllTables
};

require('make-runnable');
