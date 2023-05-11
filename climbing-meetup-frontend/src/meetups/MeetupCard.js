import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import CountContext from '../UserContext';
import ClimbMeetupApi from '../api';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MeetupCard({details}) {
  const classes = useStyles();

  const {userMeetups, currUserId} = useContext(CountContext);

  const currUserIdInt = Number(currUserId);

  // check is the current user created the meetup
  const isCreator = currUserIdInt === details.creator_user_id ? true : false;

  // const attendeeList = details.attendees;
  const [attendeeList, setAttendeeList] = useState(details.attendees);
  // const [attendees, setAttendees] = useState([]);
  // const attendeeStatus = {status: ''};
  // const INITIAL_ATTENDEE_STATUS = {status: ''};
  // const [attendeeStatus, setAttendeeStatus] = useState(INITIAL_ATTENDEE_STATUS);

  const attendeeStatus = {status: ''};

  const approvedAttendeeCount = [];

  const attendees = attendeeList.map(attendee =>{

    if(!isCreator){
      if(currUserIdInt === attendee.id){
        attendeeStatus.status = attendee.status;
      }
    }

    if(attendee.status==='approved'){
      approvedAttendeeCount.push('approved');
      return (
      <div >
        <Link to={`/users/${attendee.id}`}>
            <div style={{display: 'flex'}}>
              <Avatar 
                      alt="Spider Monkey" 
                      src="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
                      />
              <Typography data-testid="attendee" variant="body2" style={{marginLeft: '10px',marginTop: '10px',alignItems: 'center'}}>
                  {attendee.name}
                  <br/>
              </Typography>
            </div>
        </Link>

      </div>);
      }
  });

  // let approvedAttendees;

  // if(attendees.length !== 0){
  //     const filteredAttendees = attendees.filter(attendee => {
  //     return (attendee);
  //   });
  //   approvedAttendees = [...filteredAttendees];
  // }



  // set initial meetupJoinStatus after checking is user is in the attendee list
  const [meetupJoinStatus, setMeetupJoinStatus] = useState(attendeeStatus.status);
  // const [pageLoaded, setPageLoaded] = useState(false);

    const handleJoin = async () => {
      let res = await ClimbMeetupApi.joinMeetup(details.id);
      setMeetupJoinStatus(res.join_request_status);
    }

    const leaveMeetup = async () => {
      // remove attendee from state
      // call database
      let res = await ClimbMeetupApi.leaveMeetup(details.id);
      console.log('test');
      // setAttendee list
      setMeetupJoinStatus('');
      setAttendeeList(attendees => attendees.filter(attendee => attendee.id !== currUserId));
    }

  // handle which button to display based on attendee status
  let joinStatusButton;

  if(meetupJoinStatus===''){
    joinStatusButton = <Button variant='contained'  onClick={handleJoin} size="small">Join Meetup</Button>;
  }
  if(meetupJoinStatus==='pending' || meetupJoinStatus==='rejected'){
    joinStatusButton = <Button variant='contained' size="small">Pending</Button>;
  }else if(meetupJoinStatus==='approved'){
    joinStatusButton = <Button variant='contained' onClick={leaveMeetup} size="small">Leave Meetup</Button>;
  }

  // modify date format
  // can get the utc_date_time from the database

  // converts to local time on client
  const rawDateFormat = new Date(details.utc_date_time);
  const dateStr = rawDateFormat.toLocaleDateString('en-US',{timeZone:'America/New_York'});

  console.log(`Heroku DB raw date output:${details.utc_date_time}`);


  const hasApprovedAttendees = approvedAttendeeCount.length === 0 ? false:true;

  return (
    <Card className={classes.root} style={{ marginTop: '10px'}}>
      <CardContent>
        <Typography variant="h5" component="h2" >
          Climb at {details.location_name} 
        </Typography>
        <Typography variant="h6" component="h6" style={{ marginLeft: '5px'}}>
          <i>Date: {dateStr}</i>
          <br/>
        </Typography>
        <Typography variant="h6" component="h6" style={{ marginLeft: '5px'}}>
          <i>Time: {details.time} ET</i>
          <br/>
        </Typography>
        <Typography variant="h6" component="h6" style={{ marginLeft: '5px'}}>
          <i>Type: Lead Climbing</i>
          <br/>
        </Typography>
        <Typography variant="h6" component="h6" style={{ marginLeft: '5px'}}>
          <i>
            Description: {details.description}
          </i>
        </Typography>
        <Typography className={classes.title} gutterBottom>
          <b>Organized by: </b> 
        </Typography>
        <div>
            <Link to={`/users/${details.creator_user_id}`}>
              <div style={{display: 'flex'}}>
                  <Avatar 
                          alt="Spider Monkey" 
                          src="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
                          />
                  <Typography data-testid="creator-name" variant="body2" style={{marginLeft: '10px',marginTop: '10px',alignItems: 'center'}}>
                    {details.creator_name}
                  </Typography>
              </div>
            </Link>
        </div>
        {hasApprovedAttendees && <Typography className={classes.title} gutterBottom>
          <b>Attendees: </b>
        </Typography>}
        {attendees}
      </CardContent>
      <CardActions>
        {!isCreator && joinStatusButton}
        {isCreator && <Button variant='contained' size="small"><Link to={`/meetups/${details.id}/manage`}>Manage Attendees</Link></Button>}
        {isCreator && <Button variant='contained' size="small"><Link to={`/meetups/${details.id}/edit`}>Edit Meetup</Link></Button>}

      </CardActions>

    </Card>
  );
}
