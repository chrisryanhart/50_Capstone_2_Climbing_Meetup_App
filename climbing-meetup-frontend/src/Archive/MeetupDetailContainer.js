import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MeetupCard from "../MeetupCard.js";


function MeetupDetailContainer(){



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ paddingTop: '20px', height: '100vh' }} >
                    <MeetupCard/>
                    <MeetupCard/>
                    <MeetupCard/>
                </Typography>

            </Container>
        </React.Fragment>
      );

}

export default MeetupDetailContainer;