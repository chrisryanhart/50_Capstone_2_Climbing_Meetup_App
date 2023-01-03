import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

export default function MeetupFormCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          New Meetup Form
        </Typography>

        <Typography variant="body2" component="div">
            <form>
                <div>
                    <label>Creator User id: </label>
                    <input/>
                </div>
                <div>
                    <label>Date: </label>
                    <input/>  
                </div>
                <div>
                    <label>Time: </label>
                    <input/>  
                </div>
                <div>
                    <label>Duration: </label>
                    <input/>  
                </div>
                <div>
                    <label>Location: </label>
                    <input/>  
                </div>
                <div>
                    <label>Description: </label>
                    <textarea></textarea>  
                </div>
                <button>Submit</button>
            </form>
        </Typography>
      </CardContent>

    </Card>
  );
}
