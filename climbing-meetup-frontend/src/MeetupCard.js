import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
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

export default function MeetupCard({details}) {
  const classes = useStyles();

  const {userMeetups, currUserId} = useContext(CountContext);

  const isCreator = currUserId === details.creator_user_id ? true : false;


  const attendeeList = details.attendees;

  // loop through attendees
  const attendees = attendeeList.map(attendee =>{

      return (<div >
          <div style={{display: 'flex'}}>
              <Avatar 
                      alt="Spider Monkey" 
                      src="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
                      />
              <Typography variant="body2" style={{marginLeft: '10px',marginTop: '10px',alignItems: 'center'}}>
                  {attendee.name}
                  <br/>
              </Typography>
          </div>
      </div>);
  });


  // add manage meetup function



  
  


  return (
    <Card className={classes.root} style={{ marginTop: '10px'}}>
      <CardContent>
        <Typography variant="h5" component="h2" >
          Climb at {details.location_name} 
        </Typography>
        <Typography variant="h6" component="h6" style={{ marginLeft: '5px'}}>
          <i>Date: {details.date}</i>
          <br/>
        </Typography>
        <Typography variant="h6" component="h6" style={{ marginLeft: '5px'}}>
          <i>Time: {details.time}</i>
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
            <div style={{display: 'flex'}}>
                <Avatar 
                        alt="Spider Monkey" 
                        src="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
                        />
                <Typography variant="body2" style={{marginLeft: '10px',marginTop: '10px',alignItems: 'center'}}>
                  {details.creator_name}
                </Typography>
            </div>
        </div>
        <Typography className={classes.title} gutterBottom>
          <b>Attendees: </b>
        </Typography>
        {attendees}
      </CardContent>
      <CardActions>
        {!isCreator && <Button size="small">Join Meetup</Button>}
        {isCreator && <Button size="small"><Link to="/meetups/1/manage">Manage</Link></Button>}
      </CardActions>

    </Card>
  );
}
