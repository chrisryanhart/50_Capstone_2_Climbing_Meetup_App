const {SECRET_KEY} = require('../config');
const {ExpressError,NotFoundError,UnauthorizedError,BadRequestError,ForbiddenError,} = require('../expressError');

const jwt = require('jsonwebtoken');

// authenticate JWT
// include the user_id in the token
function authenticateJWT(req,res,next){
    try {
        const submittedToken = req.headers.authorization;
        if(submittedToken){
            const payload = jwt.verify(submittedToken,SECRET_KEY);
            req.user = payload;
        }
        return next();
    } catch(err){
        return next(err);
    }
}

// ensure logged in
function ensureLoggedIn(req,res,next){
    try{
        // credentials passed in from the jwt verifcation
        if(!req.user){
            throw new UnauthorizedError("Unauthorized");
        }else{
            return next();
        }    
    }catch(err){
        return next(err);
    }
}


module.exports = {authenticateJWT, ensureLoggedIn};