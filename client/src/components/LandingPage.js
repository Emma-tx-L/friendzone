import React from 'react';
import '../stylesheets/LandingPage.css';

import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default class LandingPage extends React.Component {

  constructor(props) {
    super(props);
}

componentDidMount(){
  localStorage.clear();
}

  render(){
    return (
      <div>
        <header>
          <h1 className="logo">FriendZone</h1>
          <div>
          <Button variant="contained" className="btn" disableElevation>
              <Link className="link" to="/login">Login</Link>
          </Button>
          </div>
        </header>
        <div className="splash">
          <div className="content">


          <h1 className="logo">FriendZone</h1>
          <h2>Expand your network. Try something new.</h2>
          <Button variant="contained" className="btn" disableElevation>
            <Link className="link" to="/login">Login</Link>
          </Button>
          </div>
        </div>
        <div>
          <Grid container>
            <Grid className="box" sm={2} xs={12}>
              <div className="circle">1</div>
            <div className="subtitle">Register</div>
              <div className="instruction">Create an account</div>
            </Grid>
            <Grid className="box" sm={2} xs={12}>
              <div className="circle">2</div>
              <div className="subtitle">Create your profile</div>
              <div className="instruction">Already have an account? Log in and add interests to your profile.</div>
            </Grid>
            <Grid className="box" sm={2} xs={12}>
              <div className="circle">3</div>
              <div className="subtitle">Join Events</div>
              <div className="instruction">Find events that suit your interests. Register, chat, make friends.</div>
            </Grid>
           
          </Grid>

        </div>
        
         <footer className="logo">FriendZone</footer>
      </div>
    );
  }
}
