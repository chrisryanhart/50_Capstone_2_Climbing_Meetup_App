import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ManageMeetupCard from "../ManageMeetupCard";


function ManageMeetupContainer(){


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ paddingTop: '20px', height: '100vh' }} >
                    <ManageMeetupCard/>
                </Typography>

            </Container>
        </React.Fragment>
      );

}

export default ManageMeetupContainer;
