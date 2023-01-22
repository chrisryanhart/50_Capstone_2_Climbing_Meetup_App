"use strict";

const db = require("../db.js");
// const User = require("../models/user");
const Meetup = require('./meetup')

const request = require('supertest');

const app = require('../app');


async function commonBeforeAll(){
    await db.query("DELETE FROM meetups");

    await Meetup.createMeetup(1,
        {
            date: '2023-02-01',
            time: '04:16',
            date_time_utc: '2023-02-01T02:16',
            duration: 3,
            location_id: 466,
            description: 'lead climbing only'
        });

   let res2 = await Meetup.createMeetup(2,
        {
            date: '2023-03-01',
            time: '10:16',
            date_time_utc: '2023-02-01T10:16',
            duration: 2,
            location_id: 466,
            description: 'climb and have some beers'
        });

    let res3 = await Meetup.createMeetup(3,
        {
            date: '2023-04-01',
            time: '12:16',
            date_time_utc: '2023-02-01T12:16',
            duration: 1,
            location_id: 466,
            description: 'Climb and go to marias'
        });

    await Meetup.joinMeetup(res2.id,1);

    await Meetup.joinMeetup(res3.id,1);
    
}

module.exports = {commonBeforeAll};