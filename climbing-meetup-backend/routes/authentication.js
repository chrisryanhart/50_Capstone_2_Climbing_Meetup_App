const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ExpressError, NotFoundError, BadRequestError } = require('../expressError');
// const { route } = require('../app');
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require('../config');
const { User } = require('../models/user.js');


const router = new express.Router();

// need to log the user in after registering
// return the token (with the id and username)
router.post('/register', async function(req,res,next){
    try{
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
        // retrieve password from db
        const { username, password } = req.body;
 
        // confirm candidate matches db password
        const user = await User.authenticate(username,password);

        let token = jwt.sign({id:user.id,username:user.username},SECRET_KEY);
        return res.json({token});

    }catch(err){
        return next(err);
    }

});


module.exports = router;