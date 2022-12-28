const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ensureLoggedIn} = require('../middleware/authorization');
const {ExpressError,NotFoundError,UnauthorizedError,BadRequestError,ForbiddenError,} = require('../expressError');
const { User } = require('../models/user.js');

const router = new express.Router();

// return list of all users
// may need to filter by criteria
router.get('/',ensureLoggedIn, async function(req,res,next){
    try{
        const result = await User.getAll();
        return res.json(result);
    }catch(err){
        return next(err);
    }
});

// get current user detail
// consider combining queries to get meetups a certain user is attending
router.get('/:id',ensureLoggedIn, async function(req,res,next){
    try{
        let user_id=req.params.id;
        const result = await User.getUser(user_id);
        return res.json(result);
    }catch(err){
        return next(err);
    }
});


// update user profile
// ensure current user matches
router.patch('/:id',ensureLoggedIn,async function (req,res,next){
    try{
        let user_id=Number(req.params.id);
        // confirm current user is the one changing the profile
        if(user_id !== req.user.id){
            throw new UnauthorizedError("Unauthorized");
        } 
        
        const result = await User.updateUser(user_id,req.body)
    
        return res.json(result);
    }catch(err){
        return next(err);
    }

});

module.exports = router;