import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CountContext from './UserContext';
import ClimbMeetupApi from './api';

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

export default function MeetupFormCard() {
  const classes = useStyles();

  const {currUserId} = useContext(CountContext);

  const INITIAL_STATE = {
    creatorUserId:currUserId,
    date:'',
    time:'',
    duration:'',
    location:'',
    description:''
  };

  const [meetupFormData,setMeetupFormData] = useState(INITIAL_STATE);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // convert date time to correct format
    const {date, time} = meetupFormData;

    const dateTime = date + 'T' + time;

    // value to send to database
    // value is converted to utc when submitted to database
    const localDateTimeStr = new Date(dateTime);
    
    console.log('test');


    let res = await ClimbMeetupApi.createMeetup(meetupFormData);
    setMeetupFormData(INITIAL_STATE);

    // redirect to users meetups
  }

  const handleChange = (e) => {
    const {value, name} = e.target;

    setMeetupFormData(data => ({...data, [name]: value}));
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          New Meetup Form
        </Typography>

        <Typography variant="body2" component="div">
            <form>
                <div>
                    {/* <label>Creator User id: </label> */}
                    <input value={meetupFormData.creatorUserId} hidden name='creator_user_id'/>
                </div>
                <div>
                    <label htmlFor='date'>Date: </label>
                    <input onChange={handleChange} name='date' value={meetupFormData.date} type="date"/>  
                </div>
                <div>
                    <label htmlFor='time'>Time: </label>
                    <input onChange={handleChange} name='time' value={meetupFormData.time} type="time" step="900"/>  
                </div>
                <div>
                    <label htmlFor='duration'>Duration: </label>
                    <input onChange={handleChange} name='duration' value={meetupFormData.duration} type="number"/>  
                </div>
                <div>
                    <label htmlFor='location'>Location: </label>
                    <input onChange={handleChange} name='location' value={meetupFormData.location} type="number"/>  
                </div>
                <div>
                    <label htmlFor='description'>Description: </label>
                    <textarea onChange={handleChange} name='description' value={meetupFormData.description}></textarea>  
                </div>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            </form>
        </Typography>
      </CardContent>

    </Card>
  );
}
