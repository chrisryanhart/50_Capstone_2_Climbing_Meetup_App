const db = require('../db.js');


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
        
        return result.rows[0];
    }
    static async deleteMeetup(id){
        const result = await db.query(
            `DELETE FROM meetups WHERE id=$1`,
            [id]);
        return 'success';
    }
    static async joinMeetup(id,attendee_user_id){

        const result = await db.query(
            `INSERT INTO meetups_attendees (meetup_id,
                attendee_user_id,
                join_request_status)
            VALUES ($1,$2,'pending')
            RETURNING meetup_id, join_request_status`,
            [id,attendee_user_id]);
        return result.rows[0];
    }
    static async leaveMeetup(meetup_id,attendee_user_id){

        const result = await db.query(
            `DELETE FROM meetups_attendees
            WHERE meetup_id=$1 AND attendee_user_id=$2`,
            [meetup_id,attendee_user_id]);
        
        return result;
    }
    static async handleAttendee(meetup_id, join_request_status, attendee_user_id){
        const result = await db.query(
            `UPDATE meetups_attendees set join_request_status=$1
            WHERE (meetup_id=$2 AND attendee_user_id=$3)
            RETURNING join_request_status`,
            [join_request_status,meetup_id,attendee_user_id]);

        return result.rows[0];
    }

}

module.exports = Meetup;