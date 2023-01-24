import React, {useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();

  const INITIAL_STATE = {
    username:'',
    password:'',
    name:'',
    profile_image:'',
    user_age: null,
    user_gender: '',
    is_parent: false,
    location_id: 466,
    bio:''
  }

  const [hasError, sethasError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [newProfileFormData, setNewProfileFormData] = useState(INITIAL_STATE);

  const handleCheckboxChange = (e) => {
    // e.preventDefault();
    const value = e.target.checked;
    const name = e.target.name;

    setNewProfileFormData(data => ({...data,[name]:value}));

  }

  const handleGenderChange = (e) => {
    const {value} = e.target;

    setNewProfileFormData(data => ({...data, 'user_gender': value}));
  }


  const handleChange = (e) => {
    // e.preventDefault();
    const {value, name} = e.target;

    setNewProfileFormData(data => ({...data, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newProfileFormData.user_age === ''){
      sethasError(true);
      setErrorMessage('Age input required');
      return;
    }
    let res = await registerUser(newProfileFormData);

    // if type error key doesn't exist, registration was successful
    if(typeof(res.error)==='undefined'){
      setNewProfileFormData(INITIAL_STATE);
      history.push(`/users/${res}`);
    }else{
      // if error exists
      sethasError(true);
      setErrorMessage(res.error.message);
    }
  }
  console.log(newProfileFormData.user_gender);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Complete New Profile Form:
        </Typography>

        {hasError && <Typography style={{backgroundColor:'red'}}  variant="h6" component="h2">
            <p style={{color:'white'}}><b>Error: {errorMessage}</b></p>
        </Typography>}

        <Typography variant="body2" component="div">
            <form>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input onChange={handleChange} name='username' value={newProfileFormData.username}/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" onChange={handleChange} name='password' value={newProfileFormData.password}/>  
                </div>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input onChange={handleChange} name='name' value={newProfileFormData.name}/>  
                </div>

                    <label htmlFor='user_age'>Age: </label>
                    <input type="number" onChange={handleChange} name='user_age' value={newProfileFormData.user_age}/>  
                <div> 
                    <label htmlFor='is_parent'>Parent: </label>
                    <input type="checkbox" checked={newProfileFormData.is_parent} id='is_parent' onChange={handleCheckboxChange} name='is_parent' />  

                </div>
                <div>
                    <label>Gender: </label>
                    <input type="radio" onChange={handleGenderChange} name='user_gender' value="male"/>  
                    <label className='radio' htmlFor='user_gender'>Male </label>
                    <input type="radio" onChange={handleGenderChange} name='user_gender' value="female"/>  
                    <label className='radio' htmlFor='user_gender'>Female </label>
                    <input type="radio" onChange={handleGenderChange} name='user_gender' value="nonbinary"/>  
                    <label className='radio' htmlFor='user_gender'>Non-Binary </label>  
                </div>

                <div>
                    <label htmlFor='bio'>Bio: </label>
                    <textarea onChange={handleChange} name='bio' value={newProfileFormData.bio}></textarea>  
                </div>
                <Button type='submit' onClick={handleSubmit} variant='contained'>Submit</Button>
            </form>
        </Typography>
      </CardContent>

    </Card>
  );
}
