const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ExpressError, NotFoundError, BadRequestError } = require('../expressError');
// const { route } = require('../app');
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require('../config');
const { User } = require('../models/user.js');
const jsonschema = require('jsonschema');
const loginFormSchema = require('../schemas/loginFormSchema.json');
const profileFormSchema = require('../schemas/profileFormSchema.json');


const router = new express.Router();

// need to log the user in after registering
// return the token (with the id and username)
router.post('/register', async function(req,res,next){
    try{
        const verifiedProfileData = jsonschema.validate(req.body,profileFormSchema);

        if(!verifiedProfileData.valid){
            let listOfErrors = verifiedProfileData.errors.map(err => err.stack);
            let newError = new BadRequestError(listOfErrors);
            return next(newError);
        }
        // add data validation first
        const user = await User.register(req.body);

        let token = jwt.sign({id:user.id,username:user.username},SECRET_KEY);
        return res.status(201).json({token});
    }catch(err){
        return next(err);
    }
});

// logs in user
router.post('/login', async function(req,res,next){
    try{
        const verifiedLoginData = jsonschema.validate(req.body,loginFormSchema);

        if(!verifiedLoginData.valid){
            let listOfErrors = verifiedLoginData.errors.map(err => err.stack);
            let newError = new BadRequestError(listOfErrors);
            return next(newError);
        }

        // retrieve password from db
        const { username, password } = req.body;
 
        // confirm candidate matches db password
        const user = await User.authenticate(username,password);

        // if undefined throw error

        let token = jwt.sign({id:user.id,username:user.username},SECRET_KEY);

        // return token here?
        return res.json({token});

    }catch(err){
        return next(err);
    }

});


module.exports = router;