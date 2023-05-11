import React, {useState, useContext, useEffect} from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CountContext from '../UserContext';
import ClimbMeetupApi from '../api';
import { DateTime } from 'luxon';

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

export default function EditMeetupForm() {
    const {currUserId, token} = useContext(CountContext);

    const classes = useStyles();

    const history = useHistory();

    const {id} = useParams();

    const INITIAL_STATE = {
        id: '',
        date:'',
        time:'',
        date_time_utc:'',
        duration: null,
        location_id: 466,
        description:''
    };


    const [hasError, sethasError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const [editMeetupFormData,setEditMeetupFormData] = useState(INITIAL_STATE);

    useEffect(function getMeetupDetails(){
        async function retrieveDetails(){
            let res = await ClimbMeetupApi.getMeetupDetail(id);

            // convert date to event timezone
            const timeZoneOffset = DateTime.fromISO(res[0].date_time_utc, { zone: "America/New_York" });
            const rawDateFormat = timeZoneOffset.toString();
            const date = rawDateFormat.split('T')[0];
         
            setEditMeetupFormData(data => (
                {
                ...data,
                date: date,
                time: res[0].time,
                date_time_utc: res[0].date_time_utc,
                duration: res[0].duration,
                description: res[0].description
                }
            ));
        }
        retrieveDetails();
    },[]);

    if(!token) return <Redirect to='/'/>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // convert date time to correct format
        const {date, time} = editMeetupFormData;
        if(date === ''){
            sethasError(true);
            setErrorMessage('Meetup date is required');
            return;
        }
        if(time === ''){
            sethasError(true);
            setErrorMessage('Meetup time is required');
            return;
        }

        // create local date/time string
        // format: "2023-05-10T00:00:000"
        let localTimestamp= '';
        if (date !== '' && time !== ''){
        localTimestamp = date + 'T' + time;
        }

        let localTimestampWithTimeZone = DateTime.fromISO(localTimestamp, { zone: "America/New_York" }).toString();
        let timeStampValue = new Date(localTimestampWithTimeZone);
        let utcTimestamp = timeStampValue.toISOString();
    
        // add the formatted date
        let res = await ClimbMeetupApi.updateMeetup(id,editMeetupFormData,utcTimestamp);

        if(typeof(res.error)==='undefined'){
            setEditMeetupFormData(INITIAL_STATE);
            history.push(`/users/${currUserId}/meetups`);
        }else{
            sethasError(true);
            setErrorMessage(res.error.message);
        }
    
  }

    const handleChange = (e) => {
        const {value, name} = e.target;

        setEditMeetupFormData(data => ({...data, [name]: value}));
    }

    // Create minimum possible event date to control date input
    const currDateTime = DateTime.now();
    const eventTimeZone = currDateTime.setZone('America/New_York',{keepLocalTime:true});
    const currentDateString = eventTimeZone.toString().split('T')[0];


    const handleDelete = async () => {

        let res = await ClimbMeetupApi.deleteMeetup(id);

        if(res === 'Meetup deleted'){
            history.push(`/users/${currUserId}/meetups`);
        }
    }

    return (
        <Card className={classes.root}>
        <CardContent>
            <Typography variant="h5" component="h2">
            Edit Meetup Form
            </Typography>

            {hasError && <Typography style={{backgroundColor:'red'}}  variant="h6" component="h2">
                <p style={{color:'white'}}><b>Error: {errorMessage}</b></p>
            </Typography>}

            <Typography variant="body2" component="div">
                <form>
                    <div>
                        <label htmlFor='date'>Date: </label>
                        <input type="date" min={currentDateString} aria-labelledby="date" minLength="1" onChange={handleChange} name='date' value={editMeetupFormData.date}/>  
                    </div>
                    <div>
                        <label htmlFor='time'>Time: </label>
                        <input aria-labelledby="time" minLength="1" onChange={handleChange} name='time' value={editMeetupFormData.time} type="time" step="900"/> ET  
                    </div>
                    <div>
                        <label htmlFor='duration'>Duration: </label>
                        <input aria-labelledby="duration" onChange={handleChange} name='duration' value={editMeetupFormData.duration} type="number"/>  
                    </div>
                    {/* <div>
                        <label htmlFor='location'>Location: </label>
                        <input onChange={handleChange} name='location_id' value={meetupFormData.location} type="number"/>  
                    </div> */}
                    <div>
                        <label htmlFor='description'>Description: </label>
                        <textarea aria-labelledby="description" onChange={handleChange} name='description' value={editMeetupFormData.description}></textarea>  
                    </div>
                    <Button variant='contained' onClick={handleSubmit}>Update</Button>
                    <Button style={{marginLeft:'10px', backgroundColor:'red'}} variant='contained' onClick={handleDelete}><b>Delete Meetup</b></Button>
                </form>
            </Typography>
        </CardContent>

        </Card>
  );
}
