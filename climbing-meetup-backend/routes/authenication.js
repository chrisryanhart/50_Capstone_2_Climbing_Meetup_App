const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { route } = require('../app');
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require('../config');

const router = new express.Router();


router.post('/register', async function(req,res){

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

    const hashedPassword = await bcrypt.hash(password,BCRYPT_WORK_FACTOR);   

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

// logs in user
router.post('/login', async function(req,res,next){
    // retrieve password from db
    const { username, password } = req.body;

    const result = await db.query(
        `SELECT username, password
        FROM users
        WHERE username=$1`,
        [username]);
    
    const user = result.rows[0];

    if(user){
        if(await bcrypt.compare(password,user.password)===true){
            let token = jwt.sign({username},SECRET_KEY);
            return res.json({token});
        }
    }
    // else throw error

});


// router.post('/register', async function(req,res,next){
//     // use bcrypt to hash and stoe password 

//     const { username, password } = req.body;

//     let result = await db.query(
//         `INSERT INTO users`
//     )

// });


module.exports = router;