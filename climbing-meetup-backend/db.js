// pg allows us to establish a connection with the db and run SQL commands
const { Client } = require("pg");

let DB_URI;
console.log('ENV Vars: ',process.env.NODE_ENV);

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///climbing_meetup_test";
} else {
  DB_URI = "postgresql:///climbing_meetup";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;