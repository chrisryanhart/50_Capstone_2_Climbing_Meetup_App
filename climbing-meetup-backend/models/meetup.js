const db = require('../db.js');
const {ExpressError,NotFoundError,UnauthorizedError,BadRequestError,ForbiddenError,} = require('../expressError');

class Meetup{
    static async getAll(){
        const query = await db.query(
            `SELECT *
            FROM meetups`);
        
        return query.rows;
    }

    static async getMeetup(id){
        const query = await db.query(
            `SELECT *
            FROM meetups
            WHERE id=$1`,
            [id]);
        
        if(result.rowCount === 0) throw new BadRequestError('Invalid input. No such meetup exists.');

        return query.rows[0];
    }

    static async createMeetup(details){
        const { creator_user_id,
            date,
            time,
            duration,
            location_id,
            description } = details;
    
        const result = await db.query(
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

        if(result.rowCount === 0) throw new BadRequestError('Invalid input. No such user exists.');

        return result.rows[0];
    }

    static async updateMeetup(id,details){
        const {date,time,duration,location_id,description} = details;
        const result = await db.query(
            `UPDATE meetups SET date=$1, 
                time=$2,
                duration=$3,
                location_id=$4,
                description=$5
            WHERE id=$6
            RETURNING id`,
            [date,time,duration,location_id,description,id]);
        
        if(result.rowCount === 0) throw new BadRequestError('Invalid input. No such meetup exists.');
        
        return result.rows[0];
    }
    static async deleteMeetup(id){


        const result = await db.query(
            `DELETE FROM meetups 
            WHERE id=$1
            RETURNING id`,
            [id]);
        
        if(result.rowCount === 0) throw new BadRequestError('Invalid input. No such meetup exists.');

    }
    static async joinMeetup(id,attendee_user_id){

        const result = await db.query(
            `INSERT INTO meetups_attendees (meetup_id,
                attendee_user_id,
                join_request_status)
            VALUES ($1,$2,'pending')
            RETURNING meetup_id, join_request_status`,
            [id,attendee_user_id]);
        
        // continue to look for error handling options if the meetup_id DNE
        // also look for a way to handle if the user already has already joined the meetup
        
        return result.rows[0];
    }
    static async leaveMeetup(meetup_id,attendee_user_id){

        const result = await db.query(
            `DELETE FROM meetups_attendees
            WHERE meetup_id=$1 AND attendee_user_id=$2
            RETURNING meetup_id`,
            [meetup_id,attendee_user_id]);
        
        if(result.rowCount === 0) throw new NotFoundError('Could not find meetup to leave.')
        
    }
    static async handleAttendee(meetup_id, join_request_status, attendee_user_id){
        const result = await db.query(
            `UPDATE meetups_attendees set join_request_status=$1
            WHERE (meetup_id=$2 AND attendee_user_id=$3)
            RETURNING join_request_status`,
            [join_request_status,meetup_id,attendee_user_id]);
        
        if(result.rowCount === 0) throw new NotFoundError('Could not find meetup to leave.')

        return result.rows[0];
    }

}

module.exports = Meetup;