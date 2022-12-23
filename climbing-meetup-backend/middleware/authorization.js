
const {SECRET_KEY} = require('../config');
const { ExpressError } = require('../expressError');
const jwt = require('jsonwebtoken');



// authenticate JWT
// include the user_id in the token
function authenticateJWT(req,res,next){
    try {
        const submittedToken = req.headers.authorization;
        const payload = jwt.verify(submittedToken,SECRET_KEY);
        req.user = payload;
        return next();
    } catch(err){
        return next();
    }
}

// ensure logged in
function ensureLoggedIn(req,res,next){
    // credentials passed in from the jwt verifcation
    if(!req.user){
        const err = new ExpressError("Unauthorized",401);
        return next(err);
    }else{
        return next();
    }
}


// ensure correct user



module.exports = {authenticateJWT, ensureLoggedIn};