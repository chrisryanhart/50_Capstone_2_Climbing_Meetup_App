import React, {useState,useContext, useEffect} from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CountContext from '../UserContext';
import Button from '@material-ui/core/Button';
import ClimbMeetupApi from '../api';

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

    const { id } = useParams();

    const {registerUser, currUserId, logout} = useContext(CountContext);

    const history = useHistory();

    // pull from user profile
    // const INITIAL_STATE = {
    //     username:'testuser5',
    //     password:'test',
    //     name:'spongebob',
    //     profile_image:'imagePlaceholder',
    //     user_age: 44,
    //     user_gender:'',
    //     is_parent: false,
    //     location_id: 466,
    //     bio:'I like big jugs'
    // }
    const INITIAL_STATE = {
        name:'',
        user_age: null,
        user_gender:'',
        is_parent: null,
        bio: ''
    }

    const [hasError, sethasError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const [editProfileFormData, setEditProfileFormData] = useState(INITIAL_STATE);

    useEffect(function getUserProfile(){
        async function retrieveProfile(){
            let res = await ClimbMeetupApi.getUser(id);

            setEditProfileFormData(data => (
                {
                ...data,
                name: res.name,
                user_age: res.user_age,
                user_gender: res.user_gender,
                is_parent: res.is_parent,
                bio: res.bio
                }
            ));
        }
        retrieveProfile(); 
    },[]);

    if(Number(currUserId) !== Number(id)){
        alert('Unauthorized: Acces denied!');
        return <Redirect to="/meetups"/>;
    }

    const handleCheckboxChange = (e) => {
        // e.preventDefault();
        const value = e.target.checked;
        const name = e.target.name;

        setEditProfileFormData(data => ({...data,[name]:value}));

    }

    const handleGenderChange = (e) => {
        const {value} = e.target;

        setEditProfileFormData(data => ({...data, 'user_gender': value}));
    }


    const handleChange = (e) => {
        e.preventDefault();
        const {value, name} = e.target;

        setEditProfileFormData(data => ({...data, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editProfileFormData.user_age === ''){
        sethasError(true);
        setErrorMessage('Age input required');
        return;
        }
        let res = await ClimbMeetupApi.updateUser(id,editProfileFormData);

        // if type error key doesn't exist, registration was successful
        if(typeof(res.error)==='undefined'){
            setEditProfileFormData(INITIAL_STATE);
            history.push(`/users/${res}`);
        }else{
            // if error exists
            sethasError(true);
            setErrorMessage(res.error.message);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        let res = await ClimbMeetupApi.deleteUser(id);

        if(res === "Deleted user"){
            logout();
            history.push('/');
        }
    }


    return (
        <Card className={classes.root}>
        <CardContent>
            <Typography variant="h5" component="h2">
                Edit User Profile:
            </Typography>

            {hasError && <Typography style={{backgroundColor:'red'}}  variant="h6" component="h2">
                <p style={{color:'white'}}><b>Error: {errorMessage}</b></p>
            </Typography>}

            <Typography variant="body2" component="div">
                <form>
                    {/* <div>
                        <label htmlFor='username'>Username: </label>
                        <input onChange={handleChange} name='username' value={editProfileFormData.username}/>
                    </div> */}
                    {/* <div>
                        <label htmlFor='password'>Password: </label>
                        <input type="password" onChange={handleChange} name='password' value={editProfileFormData.password}/>  
                    </div> */}
                    <div>
                        <label htmlFor='name'>Name: </label>
                        <input onChange={handleChange} name='name' value={editProfileFormData.name}/>  
                    </div>

                        <label htmlFor='user_age'>Age: </label>
                        <input type="number" onChange={handleChange} name='user_age' value={editProfileFormData.user_age}/>  
                    <div> 
                        <label htmlFor='is_parent'>Parent: </label>
                        <input type="checkbox" checked={editProfileFormData.is_parent} id='is_parent' onChange={handleCheckboxChange} name='is_parent' />  

                    </div>
                    <div>
                        <label>Gender: </label>
                        <input checked={editProfileFormData.user_gender==='Male'} type="radio" onChange={handleGenderChange} name='user_gender' value="Male"/>  
                        <label className='radio' htmlFor='user_gender'>Male </label>
                        <input checked={editProfileFormData.user_gender==='Female'} type="radio" onChange={handleGenderChange} name='user_gender' value="Female"/>  
                        <label className='radio' htmlFor='user_gender'>Female </label>
                        <input checked={editProfileFormData.user_gender==='Non-Binary'} type="radio" onChange={handleGenderChange} name='user_gender' value="Non-Binary"/>  
                        <label className='radio' htmlFor='user_gender'>Non-Binary </label>  
                    </div>

                    <div>
                        <label htmlFor='bio'>Bio: </label>
                        <textarea onChange={handleChange} name='bio' value={editProfileFormData.bio}></textarea>  
                    </div>
                    <Button type='submit' onClick={handleSubmit} variant='contained'>Update</Button>
                    <Button style={{marginLeft:'10px', backgroundColor:'red'}} type='submit' onClick={handleDelete} variant='contained'><b>Delete Profile</b></Button>
                </form>
            </Typography>
        </CardContent>

        </Card>
    );
}