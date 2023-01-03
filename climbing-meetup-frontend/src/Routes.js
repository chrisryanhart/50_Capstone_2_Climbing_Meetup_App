import React from "react";
import { Route, Switch } from "react-router-dom";
import MeetupFormCard from "./MeetupFormCard";
import MeetupCard from "./MeetupCard";
import ProfileContainer from "./ProfileContainer";
import Home from "./Home";
import ManageMeetupContainer from "./ManageMeetupContainer";
import LoginFormCard from "./LoginForm";
import ProfileFormCard from "./ProfileFormCard";


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
                    <MeetupCard/>
                </Route>
                <Route exact path="/meetups/:id/manage">
                    <ManageMeetupContainer/>
                </Route>
                <Route exact path="/meetups/:id/edit">
                    
                </Route>
                <Route exact path="/meetups/:id">
                    
                </Route>

                <Route exact path="/users/:id/meetups">
                    
                </Route>
                <Route exact path="/users/:id/edit">

                </Route>
                <Route exact path="/users/:id">
                    <ProfileContainer/>
                </Route>
            </Switch>
        </div>
    );

}

export default Routes;