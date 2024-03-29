import React, {useState, useContext} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CountContext from '../UserContext';
import ClimbMeetupApi from '../api';
import { DateTime } from "luxon";

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
  const {currUserId, token} = useContext(CountContext);

  const classes = useStyles();

  const history = useHistory();

  const INITIAL_STATE = {
    date:'',
    time:'',
    date_time_utc:'',
    duration: null,
    location_id: 466,
    description:''
  };

  const [hasError, sethasError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [meetupFormData,setMeetupFormData] = useState(INITIAL_STATE);

  if(!token) return <Redirect to='/'/>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // convert date time to correct format
    const {date, time} = meetupFormData;
    if(date === ''){
      sethasError(true);
      setErrorMessage('Meetup date is required');
      return;
    }
    if(time 
      === ''){
      sethasError(true);
      setErrorMessage('Meetup time is required');
      return;
    }

    // create local date/time string
    // format: "2023-05-10T00:00:000"
    let localTimestamp= '';
    if (date !== '' && time !== ''){
      localTimestamp = date + 'T' + time + ':00';
    }

    // create event time in local event timezone (instead of the client timezone)
    let localTimestampWithTimeZone = DateTime.fromISO(localTimestamp, { zone: "America/New_York" }).toString();
    let timeStampValue = new Date(localTimestampWithTimeZone);
    let utcTimestamp = timeStampValue.toISOString();
    
    let res = await ClimbMeetupApi.createMeetup(meetupFormData,utcTimestamp);

    if(typeof(res.error)==='undefined'){
      setMeetupFormData(INITIAL_STATE);
      history.push(`/users/${currUserId}/meetups`);
    }else{
      sethasError(true);
      setErrorMessage(res.error.message);
    }
    
  }

  const handleChange = (e) => {
    const {value, name} = e.target;

    setMeetupFormData(data => ({...data, [name]: value}));
  }


  // Create minimum possible event date to control date input
  const currDateTime = DateTime.now();
  const eventTimeZone = currDateTime.setZone('America/New_York',{keepLocalTime:true});
  const currentDateString = eventTimeZone.toString().split('T')[0];

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          New Meetup Form
        </Typography>

        {hasError && <Typography style={{backgroundColor:'red'}}  variant="h6" component="h2">
            <p style={{color:'white'}}><b>Error: {errorMessage}</b></p>
        </Typography>}

        <Typography variant="body2" component="div">
            <form>
                <div>
                    <label htmlFor='date'>Date: </label>
                    <input type="date" min={currentDateString} aria-labelledby="date" minLength="1" onChange={handleChange} name='date' value={meetupFormData.date} type="date"/>  
                </div>
                <div>
                    <label htmlFor='time'>Time: </label>
                    <input aria-labelledby="time" minLength="1" onChange={handleChange} name='time' value={meetupFormData.time} type="time" step="900"/>  ET
                    
                </div>
                <div>
                    <label for="duration" htmlFor='duration'>Duration: </label>
                    <input aria-labelledby="duration" onChange={handleChange} name='duration' value={meetupFormData.duration} type="number"/>  
                </div>
                {/* <div>
                    <label htmlFor='location'>Location: </label>
                    <input onChange={handleChange} name='location_id' value={meetupFormData.location} type="number"/>  
                </div> */}
                <div>
                    <label for="description" htmlFor='description'>Description: </label>
                    <textarea aria-labelledby="description" onChange={handleChange} name='description' value={meetupFormData.description}></textarea>  
                </div>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            </form>
        </Typography>
      </CardContent>

    </Card>
  );
}
