import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProfileCard() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // retrieve user profile
  const { id } = useParams();

  const [userProfile, setUserProfile] = userProfile([]);

  useEffect(function fetchUserProfile(){
    async function retrieveUserProfile(){
      
    }
  },[]);

  return (
    <Card className={classes.root} style={{margin: 'auto' }}>
      <CardHeader
        title="Chris Hart"
        subheader="Climbing, Bouldering"
      />
      <CardMedia
        className={classes.media}
        image="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
        title="My photo"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Bio:</b> I have climbed for years at the RRG.  Now have a family and climb indoors only.  
          Feel free to bring your kids to climb!
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Location:</b> LEF
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Age:</b> 35
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Gender:</b> M
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Belay Experience:</b> High
        </Typography>
        <Typography variant="body2" component="p">
          <Link to="/meetups"><b>See My Meetups</b></Link>
        </Typography>
      </CardContent>
    </Card>
  ); 
}
