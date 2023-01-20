import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CountContext from '../UserContext';
import Button from '@material-ui/core/Button';

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

export default function LoginFormCard() {
  const classes = useStyles();

  const history = useHistory();

  const {login, currUserId} = useContext(CountContext);

  const INITIAL_STATE = {username: 'testuser4', password:'test'};

  const [loginFormData,setLoginFormData] = useState(INITIAL_STATE);

  const handleUpdate = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    setLoginFormData(data => ({...data, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = await login(loginFormData);
    setLoginFormData(INITIAL_STATE);
    history.push(`/users/${userId}/meetups`);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Login to your account:
        </Typography>


        <Typography variant="body2" component="div">
            <form >
                <div>
                    <label for='username'>Username: </label>
                    <input name='username' onChange={handleUpdate} value={loginFormData.username}/>
                </div>
                <div>
                    <label for='password'>Password: </label>
                    <input onChange={handleUpdate} name='password' value={loginFormData.password}/>
                </div>
                <Button onClick={handleSubmit} variant='contained'>Submit</Button>
            </form>
        </Typography>
      </CardContent>

    </Card>
  );
}
