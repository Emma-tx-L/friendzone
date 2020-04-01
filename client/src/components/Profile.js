import '../stylesheets/Profile.css';
import React from 'react';
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';

class Profile extends React.Component {
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
    this.handleEditProfile = this.handleEditProfile.bind(this);
  }

  async handleEditProfile(){
    this.setState({redirect: true});
  }

  handleRedirect(){
    if (this.state.redirect){
        return ( 
        <Redirect to={{ pathname: "/edit-profile" }}/>
    )};
  }

  async componentDidMount(){
      try {
        // do api stuff  
      } 
      catch (err) {
        console.log('err fetching profile' + err);
      }
    }

  render() {
    return (
      <Container>
        <h1>Profile</h1>
        <Button
          onClick={() => this.handleEditProfile()}
          variant="contained"
          style={{ borderRadius: 25, position:'absolute', right:'50px', backgroundColor:'#5da4a9', color:'white'}}>Edit</Button>
            {this.handleRedirect()}
      </Container>
    );
  }
}

export default Profile;