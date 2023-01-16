import React, {useState,useEffect,useContext} from 'react';
import {Link, useParams, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import ClimbMeetupApi from '../api';
import CountContext from '../UserContext';

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

  const [meetupDetails, setMeetupDetails] = useState([]);

  useEffect(function fetchMeetupDetails(){
    async function retrieveMeetupDetails(){
      let res = await ClimbMeetupApi.getMeetupDetail(id);
      setMeetupDetails(data => [...data,res[0]]);
    }
    retrieveMeetupDetails();
  },[]);

  if(!currUserId) return <Redirect to='/'/>;


  // need click handlers

  const handleConfirm = async (e) =>{
    let retrieved_attendee_id = Number(e.currentTarget.dataset.tag);

    let attendeeList = [...meetupDetails[0].attendees];
    let updatedMeetupDetails = [...meetupDetails];

    const updatedAttendee = {join_request_status: null, attendee_user_id:null};

    let updatedAttendeeStatusList = attendeeList.map(attendee=>{
      if(attendee.attendee_user_id === retrieved_attendee_id){
        attendee.status = 'approved';

        // update attendee details to for database request
        updatedAttendee.join_request_status = 'approved';
        updatedAttendee.attendee_user_id = retrieved_attendee_id;

        return attendee;
      }else{
        return attendee;
      }
    });

    if(updatedAttendee.join_request_status !== null){
      await ClimbMeetupApi.handleAttendee(meetupDetails[0].id,updatedAttendee);
    }

    updatedMeetupDetails[0].attendees.length = 0;
    updatedMeetupDetails[0].attendees = updatedAttendeeStatusList;

    setMeetupDetails(updatedMeetupDetails);
    
  }

  const handleDelete = async (e) =>{
    let retrieved_attendee_id = Number(e.currentTarget.dataset.tag);

    let attendeeList = [...meetupDetails[0].attendees];
    let updatedMeetupDetails = [...meetupDetails];

    const updatedAttendee = {join_request_status: null, attendee_user_id:null};

    let updatedAttendeeStatusList = attendeeList.map(attendee=>{
      if(attendee.attendee_user_id === retrieved_attendee_id){
        attendee.status = 'rejected';

        // update attendee details to for database request
        updatedAttendee.join_request_status = 'rejected';
        updatedAttendee.attendee_user_id = retrieved_attendee_id;

        return attendee;
      }else{
        return attendee;
      }
    });

    if(updatedAttendee.join_request_status !== null){
      await ClimbMeetupApi.handleAttendee(meetupDetails[0].id,updatedAttendee);
    }

    updatedMeetupDetails[0].attendees.length = 0;
    updatedMeetupDetails[0].attendees = updatedAttendeeStatusList;

    setMeetupDetails(updatedMeetupDetails);
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
