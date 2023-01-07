const db = require('../db.js');
const {ExpressError,NotFoundError,UnauthorizedError,BadRequestError,ForbiddenError,} = require('../expressError');

class Meetup{
    static async getAll(location_id){
        // filter by locations
        const query = await db.query(`
            SELECT m.id, 
                m.creator_user_id,
                creator_user.name AS creator_name, 
                m.date, 
                m.time,
                m.date_time_utc, 
                m.duration, 
                l.name AS location_name, 
                m.description,
                attendee_user.id AS attendee_user_id, 
                attendee_user.name AS attendee_name,
                ma.join_request_status            
            FROM meetups m
            JOIN users creator_user
             ON creator_user.id = m.creator_user_id
            JOIN locations l
             ON l.id=m.location_id
            LEFT JOIN meetups_attendees ma
             ON ma.meetup_id=m.id
            LEFT JOIN users attendee_user
             ON attendee_user.id = ma.attendee_user_id`
            );
        
            let meetupIds = new Set();

            const resultArr = [];
    
            for(const meetup of query.rows){
                // if id is in set, it's at least the second instance of a meeting
                if(meetupIds.has(meetup.id)){
                    for(const result of resultArr){
                        if(result.id === meetup.id){
                            if(meetup.attendee_name !== null){
                                let newAttendee = {'id': meetup.attendee_user_id,'name': meetup.attendee_name,'status':meetup.join_request_status}
                                result.attendees.push(newAttendee);
                            }
                        }
                    }
                }else{
                    meetupIds.add(meetup.id);
                        let newMeetup = {id:meetup.id, 
                            creator_user_id: meetup.creator_user_id,
                            creator_name:meetup.creator_name, 
                            date:meetup.date, 
                            time:meetup.time,
                            utc_date_time: meetup.date_time_utc, 
                            duration: meetup.duration,
                            location_name: meetup.location_name,
                            description: meetup.description,
                            attendees:[]}
    
                        if(meetup.attendee_name !== null){
                            newMeetup.attendees.push({'id':meetup.attendee_user_id,'name':meetup.attendee_name,'status':meetup.join_request_status})
                        }
    
                        resultArr.push(newMeetup);
                    }
                }
                return resultArr;

    }

    // get all attendees and creators
    static async getMeetup(id){
        const query = await db.query(`
        SELECT m.id, 
            m.creator_user_id,
            creator_user.name AS creator_name, 
            m.date, 
            m.time,
            m.date_time_utc, 
            m.duration, 
            l.name AS location_name, 
            m.description,
            attendee_user.id AS attendee_user_id,
            attendee_user.name AS attendee_name,
            ma.join_request_status
        FROM meetups m
        JOIN users creator_user
         ON creator_user.id = m.creator_user_id
        JOIN locations l
         ON l.id=m.location_id
        LEFT JOIN meetups_attendees ma
         ON ma.meetup_id=m.id
        LEFT JOIN users attendee_user
         ON attendee_user.id = ma.attendee_user_id
        WHERE m.id=$1`,[id]);

        const dateTime = query.rows[0].date_time_utc;
        
        if(query.rowCount === 0) throw new NotFoundError('No such meetup exists.');

        let meetupIds = new Set();

        const resultArr = [];

        for(const meetup of query.rows){
            // if id is in set, it's at least the second instance of a meeting
            if(meetupIds.has(meetup.id)){
                for(const result of resultArr){
                    if(result.id === meetup.id){
                        if(meetup.attendee_name !== null){
                            let newAttendee = {'attendee_user_id':meetup.attendee_user_id,'attendee_name': meetup.attendee_name,'status':meetup.join_request_status}
                            result.attendees.push(newAttendee);
                        }
                    }
                }
            }else{
                meetupIds.add(meetup.id);
                    let newMeetup = {id:meetup.id, 
                        creator_user_id: meetup.creator_user_id,
                        creator_name:meetup.creator_name, 
                        date:meetup.date, 
                        time:meetup.time,
                        date_time_utc:meetup.date_time_utc, 
                        duration: meetup.duration,
                        location_name: meetup.location_name,
                        description: meetup.description,
                        attendees:[]}

                    if(meetup.attendee_name !== null){
                        newMeetup.attendees.push({'attendee_user_id':meetup.attendee_user_id,'attendee_name':meetup.attendee_name,'status':meetup.join_request_status})
                    }

                    resultArr.push(newMeetup);
                }
            }
            return resultArr;

    }

    static async createMeetup(creator_user_id,details){
        const { date,
            time,
            duration,
            date_time_utc,
            location_id,
            description } = details;
    
        const result = await db.query(
            `INSERT INTO meetups (creator_user_id,
                                date,
                                time,
                                date_time_utc,
                                duration,
                                location_id,
                                description)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id,creator_user_id`,
            [creator_user_id,
                date,
                time,
                date_time_utc,
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