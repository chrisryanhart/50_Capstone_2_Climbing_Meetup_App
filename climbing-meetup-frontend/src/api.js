import axios from "axios";
import token from './App';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 */

class ClimbMeetupApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { 'Authorization': `${ClimbMeetupApi.token}`};
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log(err);
      let anotherError = err.response.data;
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;

      throw anotherError;

      // return anotherError;
      // throw Error
      // return anotherError;

      throw Array.isArray(message) ? message : [message];
      
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getMeetups() {
    // consider adding more filtering later
    let res = await this.request(`meetups`);
    return res;
  }

  static async getUserMeetups(id){
    let res = await this.request(`users/${id}/meetups`);
    return res;

  }

  static async getMeetupDetail(id){
    let res = await this.request(`meetups/${id}`);
    return res;
  }

  static async getUser(id){
    try{
      let res = await this.request(`users/${id}`);
      return res;
    }catch(err){
      console.log('Heres my error:',err);
      return err;
    }

  }

  static async joinMeetup(meetup_id){
    let res = await this.request(`meetups/${meetup_id}/join`,{},'post');
    return res;
  }

  static async leaveMeetup(meetup_id){
    let res = await this.request(`meetups/${meetup_id}/leave`,{},'delete')
    return res;
  }

  static async login(loginData){
    try{
      let res = await this.request(`login`,loginData,'post');
      return res;
    }catch(err){
      console.log('Heres my error:',err);
      throw err;
    }

  }
  static async registerUser(registrationData){
    try{
      let res = await this.request('register',registrationData,'post');
      return res;
    }catch(err){
      console.log('INSIDE REGISTER USER CATCH!!!!!');
      console.log(err);
      let myError = err.response;
      console.log('Heres my error:',err);
      throw err;
    }

  }
  static async createMeetup(meetupData,formattedDateTime){
    try{
      meetupData['date_time_utc']=formattedDateTime;
      let res = await this.request('meetups/new',meetupData,'post');
      return res;
    }catch(err){
      console.log('Heres my error:',err);
      return err;
    }

  }

  static async handleAttendee(id,attendeeDetails){
    // join_request_status, attendee_user_id
    let res = await this.request(`meetups/${id}/manage`,attendeeDetails,'patch');
    return res;
  }
}



// for now, put token ("testuser" / "password" on class)
// set token to 

// ClimbMeetupApi.token = token;


export default ClimbMeetupApi;