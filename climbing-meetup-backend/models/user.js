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
            }else{
                throw new UnauthorizedError('Username and/or password is incorrect.');
            }
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
             FROM users
             WHERE id=$1`,[id]);

        if(result.rowCount === 0) throw new BadRequestError('Invalid input. No such user exists.');

        return query.rows[0];
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