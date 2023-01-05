import React from "react";
import { Route, Switch } from "react-router-dom";
import MeetupFormCard from "./MeetupFormCard";
import Home from "./Home";
import LoginFormCard from "./LoginForm";
import ProfileFormCard from "./ProfileFormCard";
import ProfileCard from './ProfileCard';
import MeetupList from "./MeetupList";
import ManageMeetupCard from "./ManageMeetupCard";


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
                <Route exact path="/register">
                    <ProfileFormCard/>
                </Route>
                <Route exact path="/meetups/new">
                    <MeetupFormCard/>
                </Route>
                <Route exact path="/meetups">
                    <MeetupList type='allMeetups'/>
                </Route>
                <Route exact path="/meetups/:id/manage">
                    <ManageMeetupCard/>
                </Route>
                <Route exact path="/meetups/:id/edit">
                    
                </Route>
                <Route exact path="/meetups/:id">
                    
                </Route>

                <Route exact path="/users/:id/meetups">
                    <MeetupList type='userMeetups'/>
                </Route>
                <Route exact path="/users/:id/edit">

                </Route>
                <Route exact path="/users/:id">
                    <ProfileCard/>
                </Route>
            </Switch>
        </div>
    );

}

export default Routes;