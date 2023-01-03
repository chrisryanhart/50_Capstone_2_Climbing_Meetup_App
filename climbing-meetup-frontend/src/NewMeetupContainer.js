import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SimpleCard from "./MeetupFormCard";


function NewMeetupContainer(){



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ paddingTop: '20px', height: '100vh' }} >
                    <SimpleCard/>
                </Typography>

            </Container>
        </React.Fragment>
      );

}

export default NewMeetupContainer;


