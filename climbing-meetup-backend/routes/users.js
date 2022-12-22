const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = new express.Router();

// return list of all users
// may need to filter by criteria
router.get('/', async function(req,res){
    // use await db.query('SQL syntax')
    let query = await db.query(
        `SELECT * FROM users`);
    return res.json(query.rows);
});

// get current user detail
router.get('/:id', async function(req,res){
    // use await db.query('SQL syntax')
    let user_id=req.params.id;
    let query = await db.query(
        `SELECT *
         FROM users
         WHERE id=$1`,[user_id]);
    return res.json(query.rows[0]);
});

// register a new user 
router.post('/register', async function(req,res){
    // need to hash pw before stored in db

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

    //change bcrypt work factor to pull from config
    const hashedPassword = await bcrypt.hash(password,12);   

    let result = await db.query(
        `INSERT INTO users (username,
                            password,
                            name,
                            profile_image,
                            user_age,
                            user_gender,
                            is_parent,
                            has_dogs,
                            bio,
                            location_id,
                            preferences)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING id, username`,
        [username,
            hashedPassword,
            name,
            profile_image,
            user_age,
            user_gender,
            is_parent,
            has_dogs,
            bio,
            location_id,
            preferences],);
    return res.status(201).json(result.rows[0]);
});

// update user profile
router.patch('/:id',async function (req,res,next){
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