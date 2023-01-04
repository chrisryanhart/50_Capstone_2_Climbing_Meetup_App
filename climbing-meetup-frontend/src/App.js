import React, {useState, useEffect} from 'react';
import { BrowserRouter } from "react-router-dom";
// import Routes from './Routes';
import NavBar from './NavBar';
import './App.css';
import NewContainer from './Container';
import CountContext from './UserContext';
import ClimbMeetupApi from './api';

function App() {
  const INITIAL_TOKEN_STATE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJ0ZXN0dXNlcjQiLCJpYXQiOjE2NzI1MDQ4MzN9.z9aOLGaqGSJNIrPZoggZzmCYAS9I9DT5kLOO_ONf46A";
  // pass handleLogin down to context
  // execute handleLogin in the LoginForm component upon form submission
  const [token,setToken] = useState(INITIAL_TOKEN_STATE);
  const [userMeetups,setUserMeetups] = useState([]);
  const [currUserId,setCurrUserId] = useState(5);

  useEffect(function fetchProfile(){
    async function retrieveProfile(){
      let res = await ClimbMeetupApi.getUserMeetups(5);
      setUserMeetups(res);
    }
    retrieveProfile();
  },[]);

  return (
    <div className="App">

      <BrowserRouter>
        {/* <ResponsiveAppBar/> */}
        <CountContext.Provider value={{token, userMeetups, currUserId}}>
          <NavBar/>
          <NewContainer/>
          {/* <Routes/> */}
        </CountContext.Provider>

      </BrowserRouter>
    </div>
  );
}

export default App;

// store appointment times in UTC format
// convert user time to UTC time before storing 
// Get current user timezone
// Intl.DateTimeFormat().resolvedOptions().timeZone
// how to calculate time once the appointment is retrieved?
// get timezone offset once retrieved
// const date = new Date();
// date.getUTCDate();


// time is output in milliseconds when taking the difference
// 
// const birthday4 = new Date(1995, 11, 17, 3, 24, 0);

// format a 
// https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs

// TIMESTAMP '2004-10-19 10:23:54'
// const utcDate1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));