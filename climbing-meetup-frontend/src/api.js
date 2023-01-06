import axios from "axios";
import token from './App';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ClimbMeetupApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    // `Bearer ${ClimbMeetupApi.token}`
    const headers = { 'Authorization': `${ClimbMeetupApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
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

  static async getUser(id){
    let res = await this.request(`users/${id}`);
    return res;
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
    let res = await this.request(`login`,loginData,'post');
    return res;
  }
}

// for now, put token ("testuser" / "password" on class)
// set token to 

// ClimbMeetupApi.token = token;


export default ClimbMeetupApi;