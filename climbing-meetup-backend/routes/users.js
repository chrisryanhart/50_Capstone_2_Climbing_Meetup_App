const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ensureLoggedIn} = require('../middleware/authorization');
const { ExpressError } = require('../expressError');
const { User } = require('../models/user.js');

const router = new express.Router();

// return list of all users
// may need to filter by criteria
router.get('/',ensureLoggedIn, async function(req,res){

    const result = await User.getAll();
    return res.json(result);
});

// get current user detail
// can combine queries to get meetups a certain user is attending
router.get('/:id',ensureLoggedIn, async function(req,res){
    // use await db.query('SQL syntax')
    let user_id=req.params.id;
    const result = await User.getUser(user_id);
    return res.json(result);
});


// update user profile
// ensure current user matches
router.patch('/:id',ensureLoggedIn,async function (req,res,next){
    let user_id=Number(req.params.id);
    // confirm current user is the one changing the profile
    if(user_id !== req.user.id){
        throw new ExpressError("Unauthorized",401);
    } 
    
    const result = await User.updateUser(user_id,req.body)

    return res.json(result);
});

module.exports = router;