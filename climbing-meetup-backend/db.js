// pg allows us to establish a connection with the db and run SQL commands
const { Client } = require("pg");
const { getDatabaseUri } = require('./config');


console.log('ENV Vars: ',process.env.NODE_ENV);

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

db.connect();

module.exports = db;