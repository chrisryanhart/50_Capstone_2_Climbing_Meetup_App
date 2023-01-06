import React, {useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CountContext from './UserContext';
import Button from '@material-ui/core';

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
  const {registerUser} = useContext(CountContext);

  const INITIAL_STATE = {
    username:'',
    password:'',
    name:'',
    imageUrl:'',
    age:'',
    gender:'',
    isParent:'',
    location:'',
    bio:''
  }

  const [newProfileFormData, setNewProfileFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    e.preventDefault();
    const {value, name} = e.target;

    setNewProfileFormData(data => ({...data, [name]: value}));
  }

  const handleSubmit = (e) => {

  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Complete New Profile Form:
        </Typography>

        <Typography variant="body2" component="div">
            <form>
                <div>
                    <label for='username'>Username: </label>
                    <input onChange={handleChange} name='username' value={newProfileFormData.username}/>
                </div>
                <div>
                    <label for='password'>Password: </label>
                    <input onChange={handleChange} name='password' value={newProfileFormData.password}/>  
                </div>
                <div>
                    <label for='name'>Name: </label>
                    <input onChange={handleChange} name='name' value={newProfileFormData.name}/>  
                </div>
                <div>
                    <label for='imageUrl'>Profile Image: </label>
                    <input onChange={handleChange} name='imageUrl' value={newProfileFormData.imageUrl}/>  
                </div>
                <div>
                    <label for='age'>Age: </label>
                    <input onChange={handleChange} name='age' value={newProfileFormData.age}/>  
                </div>
                <div>
                    <label for='isParent'>Parent: </label>
                    <input onChange={handleChange} name='isParent' value={newProfileFormData.isParent}/>  
                </div>
                <div>
                    <label for='location'>Location: </label>
                    <input onChange={handleChange} name='location' type="number" value={newProfileFormData.location}/>  
                </div>
                <div>
                    <label for='bio'>Bio: </label>
                    <textarea onChange={handleChange} name='bio' value={newProfileFormData.bio}></textarea>  
                </div>
                <Button onClick={handleSubmit} variant='contained'>Submit</Button>
            </form>
        </Typography>
      </CardContent>

    </Card>
  );
}
