import React, {useState, useEffect} from 'react';
import { BrowserRouter, useHistory } from "react-router-dom";
// import Routes from './Routes';
import NavBar from './routes-nav/NavBar';
import './App.css';
import NewContainer from './containers/Container';
import CountContext from './UserContext';
import ClimbMeetupApi from './api';

function App() {

  const history = useHistory();

  const [token,setToken] = useState(()=>{
    if(!window.localStorage.getItem('token')){
      return '';
    }else{
      return window.localStorage.getItem('token');
    }
  });
  const [currUserId,setCurrUserId] = useState(()=>{
    if(window.localStorage.getItem('userId') === null){
      return null;
    }else{
      return window.localStorage.getItem('userId');
    }
  });
  const [userMeetups,setUserMeetups] = useState([]);
  // const [currUserId,setCurrUserId] = useState(null);

  useEffect(()=>{
    window.localStorage.setItem('userId',currUserId);
    window.localStorage.setItem('token',token);
  },[token, currUserId])

  // useEffect(function fetchProfile(){
  //   async function retrieveProfile(){
  //     let res = await ClimbMeetupApi.getUserMeetups(token.);
  //     setUserMeetups(res);
  //   }
  //   if(token !== '') retrieveProfile();
  // },[]);

  const registerUser = async (registrationData) => {
    try{
      let res = await ClimbMeetupApi.registerUser(registrationData);
      // let tokenJsonFormat = JSON.stringify(res.token)
  
      window.localStorage.setItem('token',res.token);
      setToken(res.token);
      setCurrUserId(res.id);
      return res.id;
    }catch(err){
      return err;
    }

  }
  
  // test update
  const login = async (loginData) => {
    let res = await ClimbMeetupApi.login(loginData);
    window.localStorage.setItem('token',res.token);
    setToken(res.token);
    setCurrUserId(res.id);
    return res.id;
  }

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken('');
  }

  ClimbMeetupApi.token = token;

  return (
    <div className="App">
      <BrowserRouter>
        {/* <ResponsiveAppBar/> */}
        <CountContext.Provider value={{token, userMeetups, currUserId,login,registerUser, logout}}>
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