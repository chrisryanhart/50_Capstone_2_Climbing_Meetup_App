const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ExpressError } = require('../expressError');
// const { route } = require('../app');
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require('../config');
const { User } = require('../models/user.js');


const router = new express.Router();

// need to log the user in after registering
// return the token (with the id and username)
router.post('/register', async function(req,res){
 
    const user = await User.register(req.body);

    if(user){
        let token = jwt.sign({id:user.id,username:user.username},SECRET_KEY);
        return res.status(201).json({token});
    }
});

// logs in user
router.post('/login', async function(req,res,next){
    // retrieve password from db
    const { username, password } = req.body;

    // confirm candidate matches db password
    const user = await User.authenticate(username,password);

    if(user){
            let token = jwt.sign({id:user.id,username:user.username},SECRET_KEY);
            return res.json({token});
    }else{
        return res.json({status:'wrong username/password combo'});
    }
});


module.exports = router;