import React, {useState,useEffect,useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import ClimbMeetupApi from './api';
import CountContext from './UserContext';

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
// style={{ marginLeft: '5px'}}
export default function ManageMeetupCard() {
  const classes = useStyles();

  const {currUserId} = useContext(CountContext);
  const {id} = useParams();
  // call database with all the meetup details

  const [meetupDetails, setMeetupDetails] = useState([]);
  // const [attendeeList, setAttendee]

  useEffect(function fetchMeetupDetails(){
    async function retrieveMeetupDetails(){
      let res = await ClimbMeetupApi.getMeetupDetail(id);
      setMeetupDetails(data => [...data,res[0]]);
    }
    retrieveMeetupDetails();
  },[]);

  // need click handlers

  const handleConfirm = (e) =>{
    let retrieved_attendee_id = Number(e.currentTarget.dataset.tag);
    // call database
    // update status of button
    // make attendee list
    let attendeeList = meetupDetails[0].attendees;

    let updatedAttendees = attendeeList.map(attendee => {
      if(attendee.attendee_user_id === retrieved_attendee_id){
        attendee.status = 'approved';
        return attendee;
      }else{
        return attendee;
      }
    });


  
    meetupDetails[0].attendees.length=0;
    let newMeetupDetail = meetupDetails[0].attendee.push(updatedAttendees[0]);
    // delete the attendee
    console.log(meetupDetails);
    setMeetupDetails(newMeetupDetail);
    
  }

  const handleDelete = (e) =>{
    // call database
    // update status of button
    // delete the attendee
    let retrieved_attendee_id = Number(e.currentTarget.dataset.tag);
    // call database
    // update status of button
    // make attendee list
    let attendeeList = meetupDetails[0].attendees;

    let filteredAttendees = attendeeList.filter(attendee => attendee.attendee_user_id !== retrieved_attendee_id)

    if(filteredAttendees.length === 0){
      setMeetupDetails(meetup => meetup[0].attendees)
    }
    // delete the attendee
    console.log(meetupDetails);
    setMeetupDetails(meetup => meetup[0].attendees = filteredAttendees);
  }

  const pendingArr = [];
  const confirmedArr = [];

  function makeUserElement(attendee){
    const isPending = attendee.status === 'pending' ? true:false;
    const isApproved = attendee.status === 'approved' ? true:false;

    return (
        <div >
          <Link to={`users/${attendee.attendee_user_id}`}>
            <div style={{display: 'flex'}}>
              <Avatar 
                      alt="Spider Monkey" 
                      src="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
                      />
              <Typography variant="body2" style={{marginLeft: '10px',marginTop: '10px',alignItems: 'center'}}>
                  {attendee.attendee_name}
                  <br/>
              </Typography>
            </div>
          </Link>
          {isPending && <Button data-tag={attendee.attendee_user_id} onClick={handleConfirm}>Confirm</Button>}
          {isPending && <Button data-tag={attendee.attendee_user_id} onClick={handleDelete}>Reject</Button>}
          {isApproved && <Button data-tag={attendee.attendee_user_id} onClick={handleDelete}>Remove</Button>}
        </div>);
    // return correct button
  }

  if(meetupDetails.length !==0){
    meetupDetails[0].attendees.forEach(attendee => {
      if(attendee.status === 'approved' && attendee.attendee_user_id !== currUserId){
        let userElement = makeUserElement(attendee);
        confirmedArr.push(userElement);
      }
      // append to the pending list
      if(attendee.status === 'pending' && attendee.attendee_user_id !== currUserId){
        let userElement = makeUserElement(attendee);
        pendingArr.push(userElement);
      }
    })
  }


  // don't show creator as a pending attendee
  // can copy the meetup list loop

  // show 'approve'/'decline' buttons if pending
  // show 'remove' button if already approved


  return (
    <Card className={classes.root} style={{ marginTop: '10px'}}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          <b>Pending Attendees: </b>
        </Typography>
          {pendingArr}
        <Typography className={classes.title} gutterBottom>
          <b>Confirmed Attendees: </b>
        </Typography>
          {confirmedArr}
      </CardContent>
      <CardActions>
        <Button><Link to='/meetups'>Return to Meetup</Link></Button>
      </CardActions>

    </Card>
  );

}
