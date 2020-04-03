import '../stylesheets/Profile.css';
import React from 'react';
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

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
        interests: '',
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
    const id = localStorage.getItem('profileID');    
    try {
      const res = await axios.get("http://localhost:5000/api/profile/" + id);
      if (res && res.status == 200){
        const currProfile = res.data[0];
        this.setProfile(currProfile);
        console.log(this.state.profile);
      }
      else {
              this.setState({ profile: { firstname: 'cannot find'}})
      }
    } 
    catch (err) {
      console.log('err fetching profile' + err);
    }
  }

  setProfile(currProfile) {
    const dob = moment(currProfile.dob).format('MMM DD, YYYY')
    this.setState({
      profile: {
        firstname: currProfile.firstname,
        lastname: currProfile.lastname,
        dob: dob,
        email: currProfile.email
      }
    })
  }


  render() {
    const firstname = this.state.profile.firstname;
    const lastname = this.state.profile.lastname;
    const dob = this.state.profile.dob;
    const email = this.state.profile.email;
    const interests = this.state.profile.interests;
    return (
      
      <Container>
        <h1>My Profile</h1>
        <div className="profile">
            <div className="header">
            <div className="main-circle-icon">
              <PersonOutlineIcon className="main-user-icon"/>
            </div>
            </div>
            <div class="information">
              <p className="name">{firstname} {lastname}</p>
              <p className="email">{email}</p>
              <p className="dob">{dob}</p>
              <p className="interests">{interests}</p>   
            </div>
         </div>

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