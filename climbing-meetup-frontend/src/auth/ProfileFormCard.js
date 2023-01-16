import React, {useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
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

export default function ProfileFormCard() {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  const {registerUser} = useContext(CountContext);

  const INITIAL_STATE = {
    username:'testuser5',
    password:'test',
    name:'spongebob',
    profile_image:'hlkjfghlsjkdhfgklj',
    user_age:44,
    user_gender:'male',
    is_parent: false,
    location_id:480,
    bio:'I like big jugs'
  }


  const [newProfileFormData, setNewProfileFormData] = useState(INITIAL_STATE);

  const handleCheckboxChange = (e) => {
    // e.preventDefault();
    const value = e.target.checked;
    const name = e.target.name;

    setNewProfileFormData(data => ({...data,[name]:value}));

  }

  // setNewProfileFormData(data => {
  //   for(const [key,val] of Object.entries(data)){
  //     if(key===name){
  //       const test = {...data,[key]: !data.val}
  //       setNewProfileFormData({...data, [key]: !data[key]});
  //     }
  //   }
  // });

  const handleChange = (e) => {
    // e.preventDefault();
    const {value, name} = e.target;

    setNewProfileFormData(data => ({...data, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(newProfileFormData);
    setNewProfileFormData(INITIAL_STATE);
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
                    <label htmlFor='username'>Username: </label>
                    <input onChange={handleChange} name='username' value={newProfileFormData.username}/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input onChange={handleChange} name='password' value={newProfileFormData.password}/>  
                </div>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input onChange={handleChange} name='name' value={newProfileFormData.name}/>  
                </div>
                <div>
                    <label htmlFor='profile_image'>Profile Image: </label>
                    <input onChange={handleChange} name='profile_image' value={newProfileFormData.profile_image}/>  
                </div>
                <div>
                    <label htmlFor='user_age'>Age: </label>
                    <input type="number" onChange={handleChange} name='user_age' value={newProfileFormData.user_age}/>  
                </div>
                <div> 
                    <label htmlFor='is_parent'>Parent: </label>
                    <input type="checkbox" checked={newProfileFormData.is_parent} id='is_parent' onChange={handleCheckboxChange} name='is_parent' />  

                </div>
                <div>
                    <label htmlFor='user_gender'>Gender: </label>
                    <input onChange={handleChange} name='user_gender' value={newProfileFormData.user_gender}/>  
                </div>
                <div>
                    <label htmlFor='location_id'>Location: </label>
                    <input onChange={handleChange} name='location_id' type="number" value={newProfileFormData.location_id}/>  
                </div>
                <div>
                    <label htmlFor='bio'>Bio: </label>
                    <textarea onChange={handleChange} name='bio' value={newProfileFormData.bio}></textarea>  
                </div>
                <Button onClick={handleSubmit} variant='contained'>Submit</Button>
            </form>
        </Typography>
      </CardContent>

    </Card>
  );
}
