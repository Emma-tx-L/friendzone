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
import AddIcon from '@material-ui/icons/Add';
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      allActivities: [],
      profile: {
        id: '',
        firstname: '',
        lastname: '',
        dob: '',
        email: '',
        interests: []
      },
      interestMessage: '',
      activityMessage: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.colours = [
      '#FF5345',
      '#FFB55A',
      '#7BC28D',
      '#88CCF1',
      '#5C9EAD',
      '#B88DAF',
      '#AD93BA',
      '#75B8C8',
      '#F7CE5B',
      '#F4C95D'
  ]
  }

  getRandomColour = () => {
    return this.colours[Math.floor(Math.random() * this.colours.length)];
}

  async componentDidMount(){
    const id = localStorage.getItem('profileID'); 
    await this.fetchProfile(id);
    await this.fetchInterests(id);
    await this.fetchAllActivities();   
  }

  async fetchAllActivities(){
    try {
      const res = await axios.get("http://localhost:5000/api/activity/");
      if (res && res.status == 200){
        let activities = res.data.map((activity) => {
          return { type: activity.type, level: activity.level }
        })
        activities.sort((a, b) => a.type.localeCompare(b.type));
        const interests = this.state.profile.interests;
        activities = activities.filter((a) => !interests.find((i) => (i.type === a.type && a.level === i.level) ))
        this.setState({
            allActivities: activities
        })
      }
    } 
    catch (err) {
      console.log('err fetching activities' + err);
    }
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
        this.setInterests(res.data);
      }
    } 
    catch (err) {
      console.log('err fetching interests' + err);
    }
  }

  setProfile(currProfile) {
    const dob = moment(currProfile.dob).format('YYYY-MM-DD')
    this.setState({
      profile: {
        id: currProfile.id,
        firstname: currProfile.firstname,
        lastname: currProfile.lastname,
        dob: dob,
        email: currProfile.email,
        interests: []
      }
    })
  }

  setInterests(currInterests){
    const currentInterests = currInterests.map((interest) => {
      return { type: interest.activitytype, level: interest.activitylevel }
    })
    currentInterests.sort((a, b) => a.type.localeCompare(b.type));
    this.setState({
      profile: {
        id: this.state.profile.id,
        firstname: this.state.profile.firstname,
        lastname: this.state.profile.lastname,
        dob: this.state.profile.dob,
        email: this.state.profile.email,
        interests: currentInterests
      }
    })
  }

  async removeItem(item) {
    const newInterests = this.state.profile.interests.filter((interest) => {
      return !(interest.type === item.type && interest.level === item.level)
    })
    const allActivities = this.state.allActivities
    allActivities.push(item);
    allActivities.sort((a, b) => a.type.localeCompare(b.type));
    const profile = this.state.profile;
    this.setState({
        profile: {
          id: profile.id,
          firstname: profile.firstname,
          lastname: profile.lastname,
          dob: profile.dob,
          email: profile.email,
          interests: [... newInterests]
        },
        allActivities: [... allActivities]
      });
    if (newInterests.length === 0){
      this.setState({
        interestMessage: "No interests added just yet!"
      })
    }
  }

  async addItem(item) {
    const allActivities = this.state.allActivities.filter((interest) => {
      return !(interest.type === item.type && interest.level === item.level)
    })
    const newInterests = this.state.profile.interests
    newInterests.push(item);
    newInterests.sort((a, b) => a.type.localeCompare(b.type));
    const profile = this.state.profile;
    this.setState({
        profile: {
          id: profile.id,
          firstname: profile.firstname,
          lastname: profile.lastname,
          dob: profile.dob,
          email: profile.email,
          interests: [... newInterests]
        },
        allActivities: [... allActivities],
        
      });
    if (allActivities.length === 0){
      this.setState({
        activityMessage: "Looks like you have some diverse interests!"
      })
    }
  }

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
    console.log(profile);
    try {
      await axios.post("http://localhost:5000/api/profile/set-profile", { data: {profile: profile}});
    } 
    catch (err) {
      console.log('err updating profile' + err);
    }
  }

  async updateInterests(profile){
    try {
      await axios.post("http://localhost:5000/api/interests/set", { data: {profileID: profile.id, interests: profile.interests}});
    } 
    catch (err) {
      console.log('err updating interests' + err);
    }
  }

  updateLocalStorage(profile){
    localStorage.setItem('firstname', profile.firstname);
    localStorage.setItem('lastname', profile.lastname);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const profile = this.state.profile;
    console.log('submit', profile);
    this.updateLocalStorage(profile);
    await this.updateProfile(profile);
    await this.updateInterests(profile);
    this.setState({ redirect: true });
  }

  render() {
    return (
      <Container className="main" style={{ paddingLeft: '5rem'}}>
        {this.state.redirect && (<Redirect to='/profile'/>)}
        <h1 style={{ paddingTop: '1.5rem', paddingLeft: '4rem', paddingBottom: '0.5rem'}}>EDIT PROFILE</h1>
        <form style={{ marginLeft: '4rem'}} onSubmit={this.handleSubmit}>
        <Grid className="content" container xs={12} spacing={2}>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
          <Grid item xs={8}>
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
         </Grid>  

        <Grid className="interestsList" container xs={10} spacing={1}>
          <Grid item xs={5}>
            <p className="listTitle">My Interests</p>

            <ul>
            { !(this.state.profile.interests.length > 0) && this.state.interestMessage && <p>{this.state.interestMessage}</p>}
            { this.state.profile.interests && this.state.profile.interests.map((item, index) => (
              <li key={index} className="interests" style={{ border: "1px solid", borderColor: this.getRandomColour() }}>
                <span className="list-text"> {item.type}, {item.level} </span>
                {/* <Typography label= {`${item.type}`, `${item.level}`} value={`${item.type}`, `${item.level}`}/> */}
                <span>
                <IconButton style={{marginRight:"0.5rem"}} onClick={(e) => this.removeItem(item)} edge="end" aria-label="delete"> 
                  <ClearIcon />
                </IconButton>
                </span>
              
              </li>
            ))}
            </ul>

          </Grid>

          <Grid item xs={5}>
            <p className="listTitle">Options</p>
            <ul>
            { !(this.state.allActivities.length > 0) && this.state.activityMessage && <p>{this.state.activityMessage}</p>}
            { this.state.allActivities && this.state.allActivities.map((item, index) => (
              <li key={index} className="interests" style={{ border: "1px solid", borderColor: this.getRandomColour() }}>
                <span className="list-text"> {item.type}, {item.level} </span>
                {/* <Typography label= {`${item.type}`, `${item.level}`} value={`${item.type}`, `${item.level}`}/> */}
                <span>
                <IconButton style={{marginRight:"0.5rem"}} onClick={(e) => this.addItem(item)} edge="end" aria-label="add"> 
                  <AddIcon />
                </IconButton>
                </span>
              </li>
            ))}
            </ul>
          </Grid>
        </Grid>

        <Grid item >
        <Button type="submit" variant="contained" style={{ borderRadius: 25, position:'absolute', right:'200px', margin:'3rem', backgroundColor:'#5da4a9',   color:'white'}}> Save </Button>
        </Grid>

        </form>
      </Container>
      
    );
  }
}

export default EditProfile;