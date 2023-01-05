// create models to make sql queries
const db = require('../db.js');
const bcrypt = require('bcrypt');
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require('../config');
const {ExpressError,NotFoundError,UnauthorizedError,BadRequestError,ForbiddenError,} = require('../expressError');


class User{
    static async authenticate(username,password){
        const result = await db.query(
            `SELECT id, username, password
            FROM users
            WHERE username=$1`,
            [username]);

        const user = result.rows[0];
        
        if(user){
            if(await bcrypt.compare(password,user.password)===true){
                    return user;
            }
        }
        
        throw new UnauthorizedError('Username and/or password is incorrect.');
    
    }
    static async register(details){

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
            preferences} = details;

        const hashedPassword = await bcrypt.hash(password,BCRYPT_WORK_FACTOR);  

        const result = await db.query(
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

        // this should be caught by data validation 
        if(result.rowCount === 0) throw new BadRequestError('Invalid input. User could not be created.');

        return result.rows[0];
    }

    static async getAll(){
        const query = await db.query(
            `SELECT id,
                username,
                password,
                name ,
                profile_image,
                user_age,
                user_gender,
                is_parent,
                has_dogs,
                bio,
                location_id,    
                preferences 
            FROM users`);
        
        return query.rows;
    }

    static async getUser(id){
        const query = await db.query(
            `SELECT u.id,
                u.username,
                u.password,
                u.name,
                u.profile_image,
                u.user_age,
                u.user_gender,
                u.is_parent,
                u.has_dogs,
                u.bio,
                l.name AS location_name,
                u.location_id,    
                u.preferences 
             FROM users u
             JOIN locations l
              ON u.location_id=l.id
             WHERE u.id=$1`,[id]);

        if(query.rowCount === 0) throw new BadRequestError('Invalid input. No such user exists.');

        return query.rows[0];
    }

    // returns array of meetups in the following format: [{id:3, creator_name:'spider man',attendees:[{'testuser1':'approved'},{'testuser2':'pending'}]}]
    static async getUserMeetups(user_id){
        const query = await db.query(`
            SELECT m.id, 
                m.creator_user_id,
                creator_user.name AS creator_name, 
                m.date, 
                m.time, 
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
            WHERE ma.attendee_user_id=$1 OR m.creator_user_id=$1`,
            [user_id]);

        let meetupIds = new Set();

        const resultArr = [];

        for(const meetup of query.rows){
            // if id is in set, it's at least the second instance of a meeting
            if(meetupIds.has(meetup.id)){
                for(const result of resultArr){
                    if(result.id === meetup.id){
                        if(meetup.attendee_name !== null){
                            let newAttendee = {'id':meetup.attendee_user_id, 'name': meetup.attendee_name,'status':meetup.join_request_status}
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



    static async updateUser(id, criteria){
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
            preferences} = criteria;
     
    
        const result = await db.query(
            `UPDATE users SET username=$1, password=$2,
                name=$3,
                profile_image=$4,
                user_age=$5,
                user_gender=$6,
                is_parent=$7,
                has_dogs=$8,
                bio=$9,
                location_id=$10,
                preferences=$11
            WHERE id=$12
            RETURNING username`,
            [username,
                password,
                name,
                profile_image,
                user_age,
                user_gender,
                is_parent,
                has_dogs,
                bio,
                location_id,
                preferences,
                id]);

        // this should never execute due to the initial if state in the route function
        if(result.rowCount === 0) throw new BadRequestError('Invalid input. No such user exists.');

        return result.rows[0];

    }



}

module.exports = { User };