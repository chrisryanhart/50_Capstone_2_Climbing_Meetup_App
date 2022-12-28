import React from "react";
import { Route } from "react-router-dom";
import Login from "./LoginForm";
import ProfileForm from "./ProfileForm";


function Routes(){


    return (
        <div>
            <Route exact path="/">
                
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/register">
                <ProfileForm/>
            </Route>

            <Route exact path="/meetups">
                
            </Route>
            <Route exact path="/meetups/:id/edit">
                
            </Route>
            <Route exact path="/meetups/:id">
                
            </Route>
            <Route exact path="/meetups/new">
                
            </Route>
            <Route exact path="/users/:id/meetups">
                
            </Route>
            <Route exact path="/users/:id/edit">

            </Route>
            <Route exact path="/users/:id">
                
            </Route>
        </div>

    );

}

export default Routes;