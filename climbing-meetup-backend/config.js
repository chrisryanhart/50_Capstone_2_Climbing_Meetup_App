"use strict";

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const PORT = +process.env.PORT || 3001;

// const DB_URI = (process.env.NODE_ENV === "test")
// ? "postgresql:///climbing_meetup_test"
// : "postgresql:///climbing_meetup";

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "postgresql:///climbing_meetup_test"
        : process.env.DATABASE_URL || "postgresql:///climbing_meetup";
  }

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
getDatabaseUri,
SECRET_KEY,
BCRYPT_WORK_FACTOR,
PORT
};