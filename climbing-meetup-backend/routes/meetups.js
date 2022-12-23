const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { route } = require('../app');
const {ensureLoggedIn} = require('../middleware/authorization');
const { ExpressError } = require('../expressError');

const router = new express.Router();

// enable filtering for specific date/time?
// better to do filtering on the front-end?
// view all meetups
router.get('/',ensureLoggedIn, async function(req,res){
    let query = await db.query(
        `SELECT *
        FROM meetups`);
    
    return res.json(query.rows);
});


// view a specific meetup 
// can combine sql query to add additional info, like attendees
router.get('/:id',ensureLoggedIn, async function(req,res){
    let id = req.params.id;

    let query = await db.query(
        `SELECT *
        FROM meetups
        WHERE id=$1`,
        [id]);
    
    return res.json(query.rows);
});

// create new meetup 
// adding a meetup also has to add a new instance to the meetups_attendees
router.post('/new',ensureLoggedIn, async function(req,res){
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
        RETURNING id,creator_user_id`,
        [creator_user_id,
            date,
            time,
            duration,
            location_id,
            description]);

    return res.status(201).json(result.rows[0]);
});

// edit existing meetup
// ensure user editing the meetup was the creator
// throw a resource not found error
router.patch('/:id',ensureLoggedIn, async function(req,res){
    const {date,time,duration,location_id,description} = req.body;

    const id = req.params.id;

    let result = await db.query(
        `UPDATE meetups SET date=$1, 
            time=$2,
            duration=$3,
            location_id=$4,
            description=$5
        WHERE id=$6
        RETURNING id`,
        [date,time,duration,location_id,description,id]);

        // rowsCount === 0 if no match found
        // error can say no meetup found
        // or action could not be completed
        // throw error if no rows found
    
    return res.json(result.rows[0]);
});

// delete meetup
// ensure logged in user created the meetup they're deleting 
// no rows returned if a match not made
router.delete('/:id',ensureLoggedIn, async function(req,res,next){

    const id = req.params.id;

    const result = await db.query(
        `DELETE FROM meetups WHERE id=$1`,
        [id]);
    
    return res.json({message: "Deleted"});
});

// request to attend meetup 
// user should also see any requests on their profile
// making a request adds a new row to the meetups_attendees table, but not sooner
router.post('/:id/join',ensureLoggedIn,async function(req,res,next){
    let meetup_id = req.params.id;
    let attendee_user_id = 3;
    let join_request_status = 'pending';

    let result = await db.query(
        `INSERT INTO meetups_attendees (meetup_id,
            attendee_user_id,
            join_request_status)
        VALUES ($1,$2,$3)
        RETURNING meetup_id, join_request_status`,
        [meetup_id,attendee_user_id,join_request_status]);
    
    return res.json(result.rows[0]);
});

// allow users to leave a meetup
// confirm current user has an active meetup request 
// could also use try/catch error handling; if no match found
router.delete('/:id/leave',ensureLoggedIn, async function(req,res,next){
    let meetup_id = req.params.id;

    const result = await db.query(
        `DELETE FROM meetups_attendess
        WHERE meetup_id=$1 AND attendee_user_id`,
        [meetup_id,attendee_user_id]);
        
    return res.json({message:"Deleted"});
});

// accept request to join meeting 
// verify if the user requesting is the same as the creator_id
// update database with creator_user decision
// confirm user accepting was the creator 
    // can add this to the where statement in the query
    // try and catch the error
    // otherwise, can send the users meetup_ids in the request
// or two queries required
router.patch('/:id/attendees',ensureLoggedIn, async function(req,res){
    let meetup_id = req.params.id;

    const {join_request_status,attendee_user_id} = req.body;

    let result = await db.query(
        `UPDATE meetups_attendees set join_request_status=$1
        WHERE (meetup_id=$2 AND attendee_user_id=$3)
        RETURNING join_request_status`,
        [join_request_status,meetup_id,attendee_user_id]);
    
    return res.json(result.rows[0]);
});

module.exports = router;
