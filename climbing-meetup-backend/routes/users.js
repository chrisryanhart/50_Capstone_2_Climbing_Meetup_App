const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ensureLoggedIn} = require('../middleware/authorization');
const { ExpressError } = require('../expressError');

const router = new express.Router();

// return list of all users
// may need to filter by criteria
router.get('/',ensureLoggedIn, async function(req,res){
    // use await db.query('SQL syntax')
    let query = await db.query(
        `SELECT * FROM users`);
    return res.json(query.rows);
});

// get current user detail
// can combine queries to get meetups a certain user is attending
router.get('/:id',ensureLoggedIn, async function(req,res){
    // use await db.query('SQL syntax')
    let user_id=req.params.id;
    let query = await db.query(
        `SELECT *
         FROM users
         WHERE id=$1`,[user_id]);
    return res.json(query.rows[0]);
});



// update user profile
// ensure current user matches
router.patch('/:id',ensureLoggedIn,async function (req,res,next){
    let user_id=Number(req.params.id);

    // confirm current user is the one changing the profile
    if(user_id !== req.user.id){
        throw new ExpressError("Unauthorized",401);
    } 

    const { username, 
        password, 
        name, 
        profile_image, 
        user_age, 
        user_gender, 
        is_parent,
        has_dogs,
        bio,
        location_id,
        preferences} = req.body;
    
    // confirm text is not an issue for query
    const id = req.params.id;

    const result = await db.query(
        `UPDATE users SET username=$1, password=$2,
            name=$3,
            profile_image=$4,
            user_age=$5,
            user_gender=$6,
            is_parent=$7,
            has_dogs=$8,
            bio=$9,
            location_id=$10,
            preferences=$11
        WHERE id=$12
        RETURNING username`,
        [username,
            password,
            name,
            profile_image,
            user_age,
            user_gender,
            is_parent,
            has_dogs,
            bio,
            location_id,
            preferences,
            id]);

    return res.json(result.rows[0]);
});

module.exports = router;