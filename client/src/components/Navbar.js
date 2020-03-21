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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
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
        <div class="user">
          <div class="circle-icon">
        <PersonOutlineIcon className="user-icon"/>
          </div>
          <div class="name">Jane Doe</div>
        </div>
        <List>
          <ListItem>
            <HomeIcon className="icons"/>Home
          </ListItem>
          <ListItem>
            <PersonIcon className="icons"/>
            Profile
          </ListItem>
          <ListItem>
            <EventIcon className="icons"/>
            Your Events
          </ListItem>
          <ListItem>
            <ExitToAppIcon className="icons"/>
            Logout
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
