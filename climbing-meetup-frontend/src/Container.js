import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import ManageMeetupCard from "./ManageMeetupCard";
import Routes from "./Routes";


function NewContainer(){



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ paddingTop: '20px', height: '100vh' }} >
                    <Routes/>
                </Typography>

            </Container>
        </React.Fragment>
      );

}

export default NewContainer;