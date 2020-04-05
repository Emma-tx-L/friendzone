import '../stylesheets/Profile.css';
import React from 'react';
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Grid from '@material-ui/core/Grid';

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
        interests: [],
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
    await this.fetchProfile(id);
    await this.fetchInterests(id);
  }

  async fetchProfile(id){
    try {
      const res = await axios.get("http://localhost:5000/api/profile/" + id);
      if (res && res.status == 200){
        const currProfile = res.data[0];
        this.setProfile(currProfile);
      }
    } 
    catch (err) {
      console.log('err fetching profile' + err);
    }
  }

  async fetchInterests(id){
    try {
      const res = await axios.get("http://localhost:5000/api/interests/" + id);
      if (res && res.status == 200){
        console.log(res.data)
        this.setInterests(res.data);
      }
    } 
    catch (err) {
      console.log('err fetching interests' + err);
    }
  }

  setProfile(currProfile) {
    const dob = moment(currProfile.dob).format('MMM DD, YYYY')
    this.setState({
      profile: {
        firstname: currProfile.firstname,
        lastname: currProfile.lastname,
        dob: dob,
        email: currProfile.email,
        interests: this.state.profile.interests,
      }
    })
  }

  setInterests(currInterests){
    if (currInterests){
    const currentInterests = currInterests.map((interest) => {
      return { type: interest.activitytype, level: interest.activitylevel }
    })
    currentInterests.sort((a, b) => a.type.localeCompare(b.type));
    console.log(currentInterests);
    const profile = this.state.profile
    this.setState({
      profile: {
        firstname: profile.firstname,
        lastname: profile.lastname,
        dob: profile.dob,
        email: profile.email,
        interests: currentInterests
      }
    })
  }
  }


  render() {
    const firstname = this.state.profile.firstname;
    const lastname = this.state.profile.lastname;
    const dob = this.state.profile.dob;
    const email = this.state.profile.email;
    const interests = this.state.profile.interests;
    return (
      
    
        <Grid container class="main" xs={12} style={{paddingLeft:'5rem'}}>
          <Grid item xs={10}>
            <h1>YOUR PROFILE</h1>
          </Grid>
          <Grid item xs={10}>
            <div className="profile">
            <div className="header">
            <div className="main-circle-icon">
              <PersonOutlineIcon className="main-user-icon"/>
            </div>
            </div>
            <div class="information">
              <p className="name" style={{ color:'black', fontWeight:'bold', fontSize:'1.5rem'}}>{firstname} {lastname}</p>
              <p className="email">{email}</p>
              <p className="dob">{dob}</p>

              <ul >
                {this.state.profile.interests.length > 0 && <p className="interests" style={{ paddingTop: '1.5rem', width:'auto', fontWeight:'bold'}}>My Interests</p> }
              { this.state.profile.interests && this.state.profile.interests.map((item, index) => (
              <li key={index} className="interests" style={{ width:"auto"}} >
                <span className="list-text"> {item.type}, {item.level} </span>
              </li>
            ))}
            </ul>
            </div>
         </div>
          </Grid>
          <Grid item xs={10}>
            <Button
              onClick={() => this.handleEditProfile()}
              variant="contained"
              style={{ borderRadius: 25, position:'absolute', right:'245px', backgroundColor:'#5da4a9', color:'white'}}>Edit</Button>
                {this.handleRedirect()}
          </Grid>
        </Grid>
    
    );
  }
}

export default Profile;