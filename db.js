var promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: promise
});

const config = require('./config');

// Preparing the connection details:
const cn = `postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:5432/${config.DB_NAME}`;

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;