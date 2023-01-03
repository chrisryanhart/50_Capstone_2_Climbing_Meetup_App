import React from "react";
import {Link} from 'react-router-dom';

function Home(){

    return(
        <div style={{margin: 'auto'}}>
            <div style={{paddingTop:'50px',justifyContent:'center',alignContent:'center', textAlign:'center'}}>
                Welcome to the Climbing Meetup App!
                <br/>
                <br/>
                <Link to="/register">Sign up</Link> or <Link to="/login">Login</Link> to get started!
            </div>
        </div> 
    );
}

export default Home;