const path = require('path');

const DIALECT = 'sqlite';
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const STORAGE = path.join(__dirname, '../../db.sqlite');

module.exports = {
  development: {
    username: USERNAME,
    password: PASSWORD,
    database: 'catbot_dev',
    host: 'localhost',
    dialect: DIALECT,
    storage: STORAGE,
  },
  production: {
    username: USERNAME,
    password: PASSWORD,
    database: 'catbot',
    host: 'localhost',
    dialect: DIALECT,
    storage: STORAGE,
  }
};