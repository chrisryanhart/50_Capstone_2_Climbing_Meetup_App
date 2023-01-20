import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MeetupFormCard from "../meetups/MeetupFormCard";
import Home from "../homepage/Home";
import LoginFormCard from "../auth/LoginForm";
import ProfileFormCard from "../auth/ProfileFormCard";
import ProfileCard from '../profiles/ProfileCard';
import MeetupList from "../meetups/MeetupList";
import ManageMeetupCard from "../meetups/ManageMeetupCard";
import PastFutureMeetupsTab from "../meetups/PastFutureMeetupTab";


function Routes(){

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <LoginFormCard/>
                </Route>
                <Route exact path="/logout">
                    
                </Route>
                <Route exact path="/register">
                    <ProfileFormCard/>
                </Route>
                <Route exact path="/meetups/new">
                    <MeetupFormCard/>
                </Route>
                <Route exact path="/meetups">
                    <PastFutureMeetupsTab type='allMeetups'/>
                    {/* <MeetupList type='allMeetups'/> */}
                </Route>
                <Route exact path="/meetups/:id/manage">
                    <ManageMeetupCard/>
                </Route>
                <Route exact path="/meetups/:id/edit">
                    
                </Route>
                <Route exact path="/meetups/:id">
                    
                </Route>

                <Route exact path="/users/:id/meetups">
                    <PastFutureMeetupsTab type='userMeetups'/>
                    {/* <MeetupList type='userMeetups'/> */}
                </Route>
                <Route exact path="/users/:id/edit">

                </Route>
                <Route exact path="/users/:id">
                    <ProfileCard/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </div>
    );

}

export default Routes;