const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { route } = require('../app');

const router = new express.Router();

// enable filtering for specific date/time?
// better to do filtering on the front-end?
// view all meetups
router.get('/', async function(req,res){
    let query = await db.query(
        `SELECT *
        FROM meetups`);
    
    return res.json(query.rows);
});


// view a specific meetup 
router.get('/:id', async function(req,res){
    let id = req.params.id;

    let query = await db.query(
        `SELECT *
        FROM meetups
        WHERE id=$1`,
        [id]);
    
    return res.json(query.rows);
});

// create new meetup 
router.post('/new', async function(req,res){
    const { creator_user_id,
        date,
        time,
        duration,
        location_id,
        description } = req.body;

    let result = await db.query(
        `INSERT INTO meetups (creator_user_id,
                            date,
                            time,
                            duration,
                            location_id,
                            description)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id,date`,
        [creator_user_id,
            date,
            time,
            duration,
            location_id,
            description]);
    return res.status(201).json(result.rows[0]);
});

// edit existing meetup
router.patch('/:id', async function(req,res){
    const {date,time,duration,location_id,description} = req.body;

    const id = req.params.id;

    let result = await db.query(
        `UPDATE meetups SET date=$1, time=$2,
            duration=$3,
            location_id=$4,
            description=$5
        WHERE id=$6
        RETURNING id`,
        [date,time,duration,location_id,description,id]);
    
    return res.json(result.rows[0]);
});

// delete meetup
router.delete('/:id', async function(req,res,next){

    const id = req.params.id;

    const result = await db.query(
        `DELETE FROM meetups WHERE id=$1`,
        [id]);
    
    return res.json({message: "Deleted"});
});

// request to attend meetup 
// can this be handled through the twilio email api only?
// user should also see any requests on their profile


// accept request to join meeting 


// could make requests routes


module.exports = router;
