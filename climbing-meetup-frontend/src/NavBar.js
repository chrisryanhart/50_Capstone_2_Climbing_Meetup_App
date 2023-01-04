import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CountContext from './UserContext';


// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
// } from 'reactstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();;

  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {currUserId} = useContext(CountContext);

  // const [collapsed, setCollapsed] = useState(true);

  // const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <IconButton edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/">Home</Link> 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/login">Login</Link> 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/register">Register</Link> 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/meetups">See Meetups</Link> 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/meetups/new">Make New Meetup</Link> 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {/* this should be from user */}
                  <Link to={`/users/${currUserId}`}>My Profile</Link> 
                </MenuItem>
            </Menu>

          </div>
          <Typography variant="h6" className={classes.title}>
            Climbing Meetup
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;


