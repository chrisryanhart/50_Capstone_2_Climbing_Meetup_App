import React, {useEffect, useState} from "react";
import MeetupCard from "./MeetupCard";
import ClimbMeetupApi from "./api";


function MeetupList(){
    
  const [meetups,setMeetups] = useState([]);
  // save the users url in their profile 

  useEffect(function fetchMeetups(){
    async function retrieveMeetups(){
      let res = await ClimbMeetupApi.getMeetups();
      setMeetups(res);
    }
    retrieveMeetups();
  },[]);

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
