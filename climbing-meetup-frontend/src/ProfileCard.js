import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import ClimbMeetupApi from './api';
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

  const [userProfile, setUserProfile] = useState([]);

  useEffect(function fetchUserProfile(){
    async function retrieveUserProfile(){
      let res = await ClimbMeetupApi.getUser(id);
      setUserProfile(res);
    }
    retrieveUserProfile();
  },[]);

  // now update the card with the user informations
  // profiles should now update based on the url params

  return (
    <Card className={classes.root} style={{margin: 'auto' }}>
      <CardHeader
        title={userProfile.name}
        subheader="Climbing, Bouldering"
      />
      <CardMedia
        className={classes.media}
        image="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"
        title="My photo"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Bio:</b> {userProfile.bio}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* add actual location instead of id */}
          <b>Location:</b> {userProfile.location_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Age:</b> {userProfile.user_age}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Gender:</b> {userProfile.user_gender}
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
