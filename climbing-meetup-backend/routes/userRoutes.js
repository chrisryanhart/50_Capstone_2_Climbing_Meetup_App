const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = new express.Router();

// return list of all users
router.get('/', async function(req,res){
    // use await db.query('SQL syntax')
    let query = await db.query(
        `SELECT * FROM users`);
    return res.json(query);
})

module.exports = router;