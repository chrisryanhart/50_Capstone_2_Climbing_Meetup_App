import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Redirect, useParams } from "react-router-dom";
import MeetupCard from "./MeetupCard";
import ClimbMeetupApi from "../api";
import CountContext from "../UserContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PastFutureMeetupsTab({type}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


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
  for(const meetup of meetups){
    let isPast;
    let currentDateTime = Date.now();
    let meetingDateTime = Date.parse(meetup.date);

    // can pull utc_date_time here

    if(currentDateTime < meetingDateTime){
      isPast = false;
      futureMeetups.push(<MeetupCard key={meetup.id} details={meetup} isPast={isPast}/>);
    }else{
      pastMeetups.push(<MeetupCard key={meetup.id} details={meetup} isPast={isPast}/>);
    }
  }


  // const meetupCards = meetups.map(meetup =>{



    // return (<MeetupCard key={meetup.id} details={meetup} isPast={isPast}/>);
  // });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Past Meetups" {...a11yProps(0)} />
          <Tab label="Future Meetups" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {pastMeetups}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {futureMeetups}
      </TabPanel>
    </div>
  );
}
