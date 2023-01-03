import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProfileFormCard from "./ProfileFormCard";


function NewProfileContainer(){



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ paddingTop: '20px', height: '100vh' }} >
                    <ProfileFormCard/>
                </Typography>

            </Container>
        </React.Fragment>
      );

}

export default NewProfileContainer;