
const request = require('supertest');

const app = require('../app');


describe('POST /meetups/new',function(){
        const newMeetup = {
                creator_user_id: 1,
                date: '2023-02-01',
                time: '02:16',
                date_time_utc: '2023-02-01T02:16',
                duration: 3,
                location_id: 466,
                description: 'climbing meetup event test'
                };


        test('new meetup post denied - no access withou a login token', async function(){
                const resp = await request(app)
                        .post('/meetups/new')
                        .send(newMeetup);
                expect(resp.statusCode).toEqual(401);
                expect(resp.body.error.message).toEqual('Unauthorized access');

        });

        test('create meetup successful', async function(){
                const userCredentials = {username:'testuser1', password: 'test'};
                const userLogin = await request(app).post('/login').send(userCredentials);
                const userToken = userLogin.body.token;

                const resp = await request(app)
                        .post('/meetups/new')
                        .send(newMeetup)
                        .set('Authorization',userToken);
                expect(resp.statusCode).toEqual(201);
                expect(resp.body.creator_user_id).toEqual(userLogin.body.id);
                expect(typeof(resp.body.id)).toEqual("number");

                const confirmedMeetup = await request(app).get(`/meetups/${resp.body.id}`).set('Authorization',userToken);

                expect(confirmedMeetup.body[0].description).toEqual('climbing meetup event test');
        });

        // consider test so that meetups cannot be in the past
        // would that be controlled on the front or back end?


});