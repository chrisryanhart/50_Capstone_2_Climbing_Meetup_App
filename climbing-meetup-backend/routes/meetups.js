const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Meetup = require('../models/meetup');
// const { route } = require('../app');
const {ensureLoggedIn} = require('../middleware/authorization');
const { ExpressError } = require('../expressError');

const router = new express.Router();

// enable filtering for specific date/time?
// better to do filtering on the front-end?
// view all meetups
router.get('/',ensureLoggedIn, async function(req,res,next){
    try{
        const result = await Meetup.getAll();
        return res.json(result);
    }catch(err){
        return next(err);
    }
});


// view a specific meetup 
// can combine sql query to add additional info, like attendees
router.get('/:id',ensureLoggedIn, async function(req,res,next){
    try{
        let id = req.params.id;

        const result = await Meetup.getMeetup(id);
    
        return res.json(result);
    }catch(err){
        return next(err);
    }
});

// create new meetup 
// adding a meetup also has to add a new instance to the meetups_attendees
router.post('/new',ensureLoggedIn, async function(req,res,next){
    try{
        // confirm data validation with json schema
        const result = await Meetup.createMeetup(req.body);

        return res.status(201).json(result);
    }catch(err){
        return next(err);
    }

});

// edit existing meetup
// ensure user editing the meetup was the creator
// throw a resource not found error
router.patch('/:id',ensureLoggedIn, async function(req,res,next){
    try{
        // have to confirm that the meetup creator is the current user
        const id = req.params.id;

        const result = await Meetup.updateMeetup(id,req.body);
        
        return res.json(result);
    }catch(err){
        return next(err);
    }
});

// delete meetup
// ensure logged in user created the meetup they're deleting 
// no rows returned if a match not made
router.delete('/:id',ensureLoggedIn, async function(req,res,next){
    try{
        const id = req.params.id;

        await Meetup.deleteMeetup(id);
        // if(result) return res.json;
    
        return res.json({message: "Meetup deleted"});
    }catch(err){
        return next(err);
    }


});

// request to attend meetup 
// user should also see any requests on their profile
// making a request adds a new row to the meetups_attendees table, but not sooner
router.post('/:id/join',ensureLoggedIn,async function(req,res,next){
    try{
        // currently get foreign key constraint error when meeting not present
        let meetup_id = req.params.id;
        // take from req.user
        let attendee_user_id = 2;
    
        const result = await Meetup.joinMeetup(meetup_id,attendee_user_id);
    
        return res.json(result);
    }catch(err){
        return next(err);
    }
});

// allow users to leave a meetup
// confirm current user has an active meetup request 
// could also use try/catch error handling; if no match found
router.delete('/:id/leave',ensureLoggedIn, async function(req,res,next){
    try{
        let meetup_id = req.params.id;
        let user_id = 3;
    
        await Meetup.leaveMeetup(meetup_id,user_id);
    
        return res.json({message:"Left meetup"});
    }catch(err){
        return next(err);
    }
});

// accept request to join meeting 
// verify if the user requesting is the same as the creator_id
// update database with creator_user decision
// confirm user accepting was the creator 
    // can add this to the where statement in the query
    // try and catch the error
    // otherwise, can send the users meetup_ids in the request
// or two queries required
router.patch('/:id/manage',ensureLoggedIn, async function(req,res,next){
    try{
        let meetup_id = req.params.id;

        const {join_request_status,attendee_user_id} = req.body;
    
        const result = await Meetup.handleAttendee(meetup_id, join_request_status, attendee_user_id);
    
        return res.json(result);
    }catch(err){
        return next(err);
    }
});

// get all attendees at a meetup route
// consider adding a join query on meetings instead

module.exports = router;
