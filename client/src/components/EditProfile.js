import '../stylesheets/EditProfile.css';
import React from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      // allActivities: [],
      profile: {
        id: '',
        firstname: '',
        lastname: '',
        dob: '',
        email: '',
        // interests: []
      },
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    const id = localStorage.getItem('profileID'); 
    // await this.fetchAllActivities();   
    await this.fetchProfile(id);
    // await this.fetchInterests(id);
  }

  // async fetchAllActivities(){
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/activity/");
  //     if (res && res.status == 200){
  //       const activities = res.data.map((activity) => {
  //         return { type: activity.type, level: activity.level }
  //       })
  //       activities.sort((a, b) => a.type.localeCompare(b.type))
  //       this.setState({
  //           allActivities: activities
  //       })
  //     }
  //     else {
  //       console.log('error cant set activities on mount')
  //     }
  //   } 
  //   catch (err) {
  //     console.log('err fetching activities' + err);
  //   }
  // }

  async fetchProfile(id){
    try {
      const res = await axios.get("http://localhost:5000/api/profile/" + id);
      if (res && res.status == 200){
        const currProfile = res.data[0];
        this.setProfile(currProfile);
      }
      else {
        console.log('error cant set profile on mount')
      }
    } 
    catch (err) {
      console.log('err fetching profile' + err);
    }
  }

  // async fetchInterests(id){
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/interests/" + id);
  //     if (res && res.status == 200){
  //       const currInterests = res.data;
  //       this.setInterests(currInterests);
  //     }
  //     else {
  //       console.log('error cant set interests on mount')
  //     }
  //   } 
  //   catch (err) {
  //     console.log('err fetching interests' + err);
  //   }
  // }

  setProfile(currProfile) {
    const dob = moment(currProfile.dob).format('YYYY-MM-DD')
    this.setState({
      profile: {
        id: currProfile.id,
        firstname: currProfile.firstname,
        lastname: currProfile.lastname,
        dob: dob,
        email: currProfile.email
      }
    })
  }

  // setInterests(currInterests){
  //   const currentInterests = currInterests.map((interest) => {
  //     return { type: interest.activitytype, level: interest.activitylevel }
  //   })
  //   this.setState({
  //     profile: {
  //       interests: currentInterests
  //     }
  //   })
  // }

  // async removeInterest(item) {
  //   const newInterests = this.state.profile.interests.filter((interest) => {
  //     return interest.type !== item.type && interest.level !== item.level
  //   })
  //   newInterests.sort((a, b) => a.type.localeCompare(b.type));
  //   this.setState({
  //       profile: {
  //         interests: [... newInterests]
  //       }
  //     })
    
  //     // try {
  //     //   const res = await axios.get("http://localhost:5000/api/interests/remove", { data: {interest: item, profile: this.state.profile.id}});
  //     //   if (res && res.status == 200){
  //     //     this.setState({ allActivities: [... this.state.allActivities, item] })
  //     //   }
  //     //   else {
  //     //     console.log('error can remove interest')
  //     //   }
  //     // } 
  //     // catch (err) {
  //     //   console.log('err' + err);
  //     // }


  //   if (newInterests.length === 0){
  //     this.setState({
  //       message: "No interests added just yet!"
  //   })
  // }
  // }

  handleRedirect(){
    if (this.state.redirect){
        return ( 
        <Redirect to={{ pathname: "/profile" }}/>
    )};
  }

  handleChange(e){
    this.setState(Object.assign(this.state.profile, {[e.target.name]: e.target.value }));
  }

  async updateProfile(profile){
    try {
      await axios.post("http://localhost:5000/api/profile/set-profile", { data: {profile: profile}});
    } 
    catch (err) {
      console.log('err creating profile' + err);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const profile = this.state.profile;
    await this.updateProfile(profile) 
    this.setState({ redirect: true });
  }

  render() {
    return (
      <Container className="main">
        {this.state.redirect && (<Redirect to='/profile'/>)}
        <h1>Edit Profile</h1>
        <form onSubmit={this.handleSubmit}>

        <Grid item xs={5}>
            <TextField
              required
              inputProps={{ maxLength: 200}}
              id="firstname"
              name="firstname"
              value={this.state.profile.firstname}
              label="First Name"
              fullWidth
              autoComplete="firstname"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              inputProps={{ maxLength: 200}}
              id="lastname"
              name="lastname"
              value={this.state.profile.lastname}
              label="Last Name"
              fullWidth
              autoComplete="lastname"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              disabled
              required
              inputProps={{ maxLength: 200}}
              id="email"
              name="email"
              value={this.state.profile.email}
              label="Email"
              fullWidth
              autoComplete="email"
              onChange={this.handleChange}
            />
          </Grid>
          
{/* DOB */}
          <Grid item xs={5}>
          <TextField
          id="dob"
          name="dob"
          value={this.state.profile.dob}
          label="Birthday"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleChange}
        />
         </Grid>  
{/*          
          <p>My Interests</p>

          <ul>
            { this.state.profile.interests && this.state.profile.interests.map((item, index) => (
            <li key={index} className="interests" >
              <span className="list-text">
                {item.type}, {item.level}
              </span>
              <TextField
                label= {`${item.type}`, `${item.level}`}
                value={`${item.type}`, `${item.level}`}
        />

                <IconButton onClick={(e) => this.removeInterest(item)} edge="end" aria-label="delete">
                      <ClearIcon />
                    </IconButton>
              </li>
          ))}
           { this.state.message && <p>{this.state.message}</p>}
        </ul> */}

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