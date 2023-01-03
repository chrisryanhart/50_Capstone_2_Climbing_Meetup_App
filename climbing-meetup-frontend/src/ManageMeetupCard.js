import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
// style={{ marginLeft: '5px'}}
export default function ManageMeetupCard() {
  const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} style={{ marginTop: '10px'}}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          <b>Pending Attendees: </b>
        </Typography>
        <div>
            <div style={{display: 'flex'}}>
                <Avatar 
                        alt="Spider Monkey" 
                        src="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
                        />
                <Typography variant="body2" style={{marginLeft: '10px',marginTop: '10px',alignItems: 'center'}}>
                    Chris Hart
                </Typography>
            </div>

            <div>
                <Button style={{paddingLeft: '0px',marginTop: '5px'}} size="small">Accept</Button>
                <Button style={{paddingLeft: '0px',marginTop: '5px'}} size="small">Decline</Button>
            </div>
        </div>
        <Typography className={classes.title} gutterBottom>
          <b>Confirmed Attendees: </b>
        </Typography>
        <div >
            <div style={{display: 'flex'}}>
                <Avatar 
                        alt="Spider Monkey" 
                        src="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
                        />
                <Typography variant="body2" style={{marginLeft: '10px',marginTop: '10px',alignItems: 'center'}}>
                    Chris Hart
                    <br/>
                </Typography>
            </div>
            <div>
                <Button style={{paddingLeft: '0px',marginTop: '5px'}} size="small">Remove</Button>
            </div>
        </div>
      </CardContent>
      <CardActions>
        <Button><Link to='/meetups'>Return to Meetup</Link></Button>
      </CardActions>

    </Card>
  );

}
