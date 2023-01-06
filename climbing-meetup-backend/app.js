const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const users = require('./routes/users');
const meetups = require('./routes/meetups');
const authentication = require('./routes/authentication');

const { ExpressError } = require('./expressError');
const {authenticateJWT} = require('./middleware/authorization');

const app = express();

app.use(cors());
// parse json
app.use(express.json());
// parse form data
app.use(express.urlencoded({extended: true}));

app.use(morgan("tiny"));


app.use(authenticateJWT);

// allow user to register or login without token

// confirm user authentication before accessing protected routes

app.use('/', authentication);

app.use('/users', users);
app.use('/meetups', meetups);


// 404 route not found error handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });

// generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });

module.exports = app;
