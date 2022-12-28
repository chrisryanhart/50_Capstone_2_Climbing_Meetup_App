const db = require('../db.js');
const {ExpressError,NotFoundError,UnauthorizedError,BadRequestError,ForbiddenError,} = require('../expressError');

class Meetup{
    static async getAll(){
        const query = await db.query(
            `SELECT creator_user_id,
                date,
                time,
                duration,
                location_id,
                description
            FROM meetups`);
        
        return query.rows;
    }

    static async getMeetup(id){
        const query = await db.query(
            `SELECT creator_user_id,
                date,
                time,
                duration,
                location_id,
                description
            FROM meetups
            WHERE id=$1`,
            [id]);
        
        if(result.rowCount === 0) throw new NotFoundError('No such meetup exists.');

        return query.rows[0];
    }

    static async createMeetup(creator_user_id,details){
        const { date,
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

        // if(result.rowCount === 0) throw new BadRequestError('Invalid input. No such user exists.');

        return result.rows[0];
    }

    static async updateMeetup(id,creator_user_id,details){
        const {date,time,duration,location_id,description} = details;
        const result = await db.query(
            `UPDATE meetups SET date=$1, 
                time=$2,
                duration=$3,
                location_id=$4,
                description=$5
            WHERE id=$6 AND creator_user_id=$7
            RETURNING id`,
            [date,time,duration,location_id,description,id,creator_user_id]);
        
        if(result.rowCount === 0) throw new NotFoundError('Invalid input. No such meetup exists.');
        
        return result.rows[0];
    }
    static async deleteMeetup(id,creator_user_id){

        const result = await db.query(
            `DELETE FROM meetups 
            WHERE id=$1 AND creator_user_id=$2
            RETURNING id`,
            [id,creator_user_id]);
        
        if(result.rowCount === 0) throw new NotFoundError('Invalid input. No such meetup exists.');

    }
    static async joinMeetup(id,attendee_user_id){

        // add select query first 
        // or let psql handle the error?

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
    // updates only if a match is found with the user and meetup
    static async leaveMeetup(meetup_id,attendee_user_id){

        const result = await db.query(
            `DELETE FROM meetups_attendees
            WHERE meetup_id=$1 AND attendee_user_id=$2
            RETURNING meetup_id`,
            [meetup_id,attendee_user_id]);
        
        if(result.rowCount === 0) throw new NotFoundError('Could not find meetup to leave.')
        
    }
    // update only made if the creator_user_id and meetup_id match, else nothing is returned
    static async handleAttendee(meetup_id, curr_user_id, join_request_status, attendee_user_id){
        const result = await db.query(

            `UPDATE meetups_attendees AS ma
            SET join_request_status='test4'
            FROM meetups AS m
            WHERE (ma.meetup_id=$1 AND ma.attendee_user_id=$ AND m.creator_user_id=3)
            RETURNING ma.meetup_id, ma.attendee_user_id, ma.join_request_status, m.creator_user_id;`,
            [join_request_status,meetup_id,attendee_user_id,curr_user_id]);
        
        if(result.rowCount === 0) throw new NotFoundError('Meetup does not exist or was not created by the current user');

        return result.rows[0];
    }

}

module.exports = Meetup;