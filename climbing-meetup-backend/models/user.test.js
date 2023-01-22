
const request = require('supertest');

const app = require('../app');

const {
    commonBeforeAll,
  } = require("./_testCommon");

beforeAll(commonBeforeAll);

describe('GET /users/:id/meetups',function(){

        test('get users meetups', async function(){
            const userCredentials = {username:'testuser1', password: 'test'};
            const userLogin = await request(app).post('/login').send(userCredentials);
            const userToken = userLogin.body.token;

            const resp = await request(app)
                    .get(`/users/${userLogin.body.id}/meetups`)
                    .set('Authorization',userToken);
            expect(resp.statusCode).toEqual(200);
            // expect(resp.body.creator_user_id).toEqual(userLogin.body.id);
            // expect(typeof(resp.body.id)).toEqual("number");
            expect(resp.body.length).toEqual(3);
            expect(resp.body[0].creator_user_id).toEqual(1);
            expect(resp.body[1].attendees[0].name).toEqual('spider man');
            expect(resp.body[2].attendees[0].name).toEqual('spider man');
        });

        
        test('non-existing user not found', async function(){
            const userCredentials = {username:'testuser1', password: 'test'};
            const userLogin = await request(app).post('/login').send(userCredentials);
            const userToken = userLogin.body.token;

            const resp = await request(app)
                    .get(`/users/100/meetups`)
                    .set('Authorization',userToken);
            expect(resp.statusCode).toEqual(200);
            expect(resp.body.length).toEqual(0);
        });

},10000);