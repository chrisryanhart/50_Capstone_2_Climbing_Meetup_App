import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
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

export default function ProfileFormCard() {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Complete New Profile Form:
        </Typography>

        <Typography variant="body2" component="div">
            <form>
                <div>
                    <label>Username: </label>
                    <input/>
                </div>
                <div>
                    <label>Password: </label>
                    <input/>  
                </div>
                <div>
                    <label>Name: </label>
                    <input/>  
                </div>
                <div>
                    <label>Profile Image: </label>
                    <input/>  
                </div>
                <div>
                    <label>Age: </label>
                    <input/>  
                </div>
                <div>
                    <label>Parent: </label>
                    <input/>  
                </div>
                <div>
                    <label>Climbing Type(s): </label>
                    <input/>  
                </div>
                <div>
                    <label>Location: </label>
                    <input type="number"/>  
                </div>
                <div>
                    <label>Bio: </label>
                    <textarea></textarea>  
                </div>
                <button>Submit</button>
            </form>
        </Typography>
      </CardContent>

    </Card>
  );
}
