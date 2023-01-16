import React, {useEffect, useState, useContext} from "react";
import { Redirect, useParams } from "react-router-dom";
import MeetupCard from "./MeetupCard";
import ClimbMeetupApi from "../api";
import CountContext from "../UserContext";


function MeetupList({type}){

  const { currUserId } = useContext(CountContext);


  const {id} = useParams();

  const [meetups,setMeetups] = useState([]);

  // save the users url in their profile 

  useEffect(function fetchMeetups(){
    async function retrieveAllMeetups(){
      // can add conditional that manages which api call to use
      let res = await ClimbMeetupApi.getMeetups();
      setMeetups(res);
    }
    async function retrieveUserMeetups(){
      // can add conditional that manages which api call to use
      let res = await ClimbMeetupApi.getUserMeetups(id);
      setMeetups(res);
    }
    if(type==='allMeetups') retrieveAllMeetups();
    if(type==='userMeetups') retrieveUserMeetups();
  },[type]);

  if(!currUserId) return <Redirect to='/'/>;

  const meetupCards = meetups.map(meetup => <MeetupCard key={meetup.id} details={meetup}/>);

// loop through meetups
// render MeetupCards

// on MeetupCard tab, will have to compare these meetups to those of the 
// current user
// if current user is the creator, show different buttons

  return (
        <div>
          {meetupCards}
        </div>
    );
}

export default MeetupList;
