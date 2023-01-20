import React, {useEffect, useState, useContext} from "react";
import { Redirect, useParams } from "react-router-dom";
import MeetupCard from "./MeetupCard";
import ClimbMeetupApi from "../api";
import CountContext from "../UserContext";
import PastFutureMeetupsTab from "./PastFutureMeetupTab";


function MeetupList({type}){

  const { currUserId, token } = useContext(CountContext);


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

  if(!token){
    return <Redirect to='/'/>;
  } 

  // depending on tab state, one or the other will be shown

  let pastMeetups = [];
  let futureMeetups = [];

  // use a standard for loop instead of map
  const meetupCards = meetups.map(meetup =>{
    let isPast;
    let currentDateTime = Date.now();
    let meetingDateTime = Date.parse(meetup.date);

    if(currentDateTime < meetingDateTime){
      isPast = false;
      futureMeetups.push(meetup);
    }else{
      pastMeetups.push(meetup);
    }
    return (<MeetupCard key={meetup.id} details={meetup} isPast={isPast}/>);
  });

// loop through meetups
// render MeetupCards

// on MeetupCard tab, will have to compare these meetups to those of the 
// current user
// if current user is the creator, show different buttons

  return (
        <div>
          {/* Add place for tabs */}
          {/* <PastFutureMeetupsTab meetupCards={{meetupCards}}/> */}
          {meetupCards}
        </div>
    );
}

export default MeetupList;
