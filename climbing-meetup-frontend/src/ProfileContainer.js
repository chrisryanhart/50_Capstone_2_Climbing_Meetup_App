import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProfileCard from "./ProfileCard";


function ProfileContainer(){


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{paddingTop: '20px', margin: 'auto' }} >
                    <ProfileCard/>
                </Typography>

            </Container>
        </React.Fragment>
      );

}

export default ProfileContainer;