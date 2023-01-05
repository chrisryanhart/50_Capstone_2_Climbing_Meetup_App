\echo 'Delete and recreate climbing_metup db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE climbing_meetup;
CREATE DATABASE climbing_meetup;
\connect climbing_meetup

\i climbing-meetup-schema.sql
\i climbing-meetup-seed.sql


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
            WHERE creator_user.id=1 OR m.id =  (SELECT m.id
                            FROM meetups m 
                            LEFT JOIN meetups_attendees ma 
                                ON m.id = ma.meetup_id 
                            WHERE ma.attendee_user_id=2; 
                
                );