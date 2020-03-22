import React from 'react';
import '../stylesheets/Navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Link, Redirect, useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const loggedIn = localStorage.getItem('profileID');

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  }

  return (
    !loggedIn ? null : 
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <div className="user">
          <div className="circle-icon">
          <PersonOutlineIcon className="user-icon"/>
          </div>
          <div className="name">Jane Doe</div>
        </div>
        <List>
          <ListItem button>
            <Link icon={<HomeIcon/>} className="nav-btn" to="/home">
              <HomeIcon className="icons"/>
              <span>Home</span>
            </Link>
          </ListItem>
          <ListItem button>
            <Link className="nav-btn" to="/profile">
                <PersonIcon className="icons"/>
                <span>
                Profile</span>
            </Link>
          </ListItem>
          <ListItem button>
            <Link className="nav-btn" to="/my-events">
              <EventIcon className="icons"/>
              <span>
              Your Events</span>
            </Link>
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <div className="nav-btn">
              <ExitToAppIcon className="icons"/>
              <span>
              Logout</span>
            </div>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
