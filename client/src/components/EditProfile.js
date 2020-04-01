import '../stylesheets/EditProfile.css';
import React from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Container from '@material-ui/core/Container';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      profile: {
        firstname: '',
        lastname: '',
        dob: '',
        email: '',
        interests: {},
      },
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
      try {
        // do api stuff  
      } 
      catch (err) {
        console.log('err fetching profile' + err);
      }
    }

    handleRedirect(){
      if (this.state.redirect){
          return ( 
          <Redirect to={{ pathname: "/profile" }}/>
      )};
    }

    setProfile(profile){
      this.setState({
        profile: {
          firstname: '',
          lastname: '',
          dob: '',
          email: '',
          interests: {},
        }
      })
    }

    async createProfile(profile){
      const profileID = localStorage.getItem('profileID');    
      try {
        // do api stuff
      } 
      catch (err) {
        console.log('err creating profile' + err);
      }
    }

    async handleSubmit(e) {
      e.preventDefault();
      // do stuff 
      this.setState({ redirect: true });
    }

  render() {
    return (
      <Container>
        {this.state.redirect && (<Redirect to='/profile'/>)}
        <h1>Edit Profile</h1>
        <form onSubmit={this.handleSubmit}>
          <Button 
            type="submit"
            variant="contained"
            style={{ borderRadius: 25, position:'absolute', right:'175px', marginTop:'50px', backgroundColor:'#5da4a9', color:'white'}}> 
            Save
        </Button>
        </form>
      </Container>
      
    );
  }
}

export default EditProfile;