import '../stylesheets/EditEvent.css';
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

class EditEvent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false,
      newEvent: {
        eventName: '',
        startDate: '',
        endDate: '',
        activityType: '',
        activityLevel: '',
        description: '',
        aptNumber: '',
        streetName: '',
        postalCode: '',
        city: '',
        province: '',
        chatID: null,
      },
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    if (this.props.location.state.id){
      try {
        const id = this.props.location.state.id;
        const res = await axios.get("http://localhost:5000/api/event/my-events/" + id);
        if (res && res.status == 200){
          const event = res.data[0];
          this.setEvent(event);
          console.log(event);
        }

      } 
      catch (err) {
        console.log('err creating new event' + err);
      }
    }

  }
  
  setEvent(event){
    const startDate = moment(event.starttime).format('YYYY-MM-DDTHH:mm:ss.SSS')
    const endDate = moment(event.endtime).format('YYYY-MM-DDTHH:mm:ss.SSS')
    console.log(event);
    this.setState({
      newEvent: {
        eventName: event.name,
        startDate: startDate,
        endDate: endDate,
        activityType: event.activitytype,
        activityLevel: event.activitylevel,
        description: event.description,
        aptNumber: event.streetnumber,
        streetName: event.streetname,
        postalCode: event.postalcode,
        city: event.city,
        province: event.province,
        chatID: event.chatid
      }
    })
  }

  handleChange(e){
    this.setState(Object.assign(this.state.newEvent, {[e.target.name]: e.target.value }));
  }

  async createNewEvent(event){
    const profileID = localStorage.getItem('profileID');    
    try {
      await axios.post("http://localhost:5000/api/event/create-event", { data: {event: event, profileID: profileID}});
    } 
    catch (err) {
      console.log('err creating new event' + err);
    }
  }

  async updateEvent(event, eventID){
    try {
      await axios.post("http://localhost:5000/api/event/update-event", { data: {event: event, eventID: eventID}});
    } 
    catch (err) {
      console.log('err updating event' + err);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const eventID = this.props.location.state.id
    let event = this.state.newEvent;
    if (eventID){
      await this.updateEvent(event, eventID);
    }
    else {
      await this.createNewEvent(event);
    }
    this.setState({ redirect: true });
  }

  render() {
      return (
          <div>
            {this.state.redirect && (<Redirect to='/my-events'/>)}

            <form onSubmit={this.handleSubmit}>
              <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Enter your event details below
        </Typography>
        <Grid container spacing={3}>
          {/* event name */}
          <Grid item xs={10}>
            <TextField
              required
              inputProps={{ maxLength: 100}}
              id="eventName"
              name="eventName"
              value={this.state.newEvent.eventName}
              label="Event Name"
              fullWidth
              autoComplete="eventname"
              onChange={this.handleChange}
            />
          </Grid>
          
          {/* start end date */}
          <Grid item xs={5}>
          <TextField
          id="startdatetime"
          name="startDate"
          value={this.state.newEvent.startDate}
          label="Start Date"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleChange}
        />
         </Grid>     
          <Grid item xs={5}>
         <TextField
          id="enddatetime-local"
          label="End Date"
          value={this.state.newEvent.endDate}
          name="endDate"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleChange}
        />
         </Grid>
          
          {/* activity lvl and type */}
          <Grid item xs={5}>
            <FormControl required fullWidth>
              <InputLabel id="activityType">Activity Type</InputLabel>
              <Select
                labelId="activityType"
                id="activityType"
                name="activityType"
                value={this.state.newEvent.activityType}
                onChange={this.handleChange}
              >
                <MenuItem value={'Arts'}>Arts</MenuItem>
                <MenuItem value={'Fitness'}>Fitness</MenuItem>
                <MenuItem value={'Food & Drink'}>Food and Drink</MenuItem>
                <MenuItem value={'Music'}>Music</MenuItem>
                <MenuItem value={'Technology'}>Technology</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
        </FormControl>
          </Grid>      
          <Grid item xs={5}>
            <FormControl required fullWidth>
              <InputLabel id="activityLevel">Activity Level</InputLabel>
              <Select
                labelId="activityLevel"
                id="activityLevel"
                name="activityLevel"
                value={this.state.newEvent.activityLevel}
                onChange={this.handleChange}
              >
                <MenuItem value={'Beginner'}>Beginner</MenuItem>
                <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                <MenuItem value={'Advanced'}>Advanced</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
        </FormControl>
          </Grid>
          
          {/* description */}
          <Grid item xs={10}>
            <TextField
              inputProps={{ maxLength: 500}}
              multiline
              variant="outlined"
              rows="5"
              id="description"
              name="description"
              value={this.state.newEvent.description}
              label="Description"
              fullWidth
              autoComplete="description"
              onChange={this.handleChange}
            />
          </Grid>
          
          {/* address */}
          <Grid item xs={12} sm={3}>
            <TextField
            fullWidth
              id="aptNumber"
              name="aptNumber"
              value={this.state.newEvent.aptNumber}
              label="Apt Number"
              autoComplete="address-aptNumber"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
            fullWidth
              id="streetName"
              name="streetName"
              value={this.state.newEvent.streetName}
              label="Street"
              autoComplete="address-streetName"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
            required
            inputProps={{ maxLength: 7}} 
              id="postalCode"
              name="postalCode"
              value={this.state.newEvent.postalCode}
              label="Postal Code"
              fullWidth
              autoComplete="address-postal-code"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
            inputProps={{ maxLength: 100}} 
              id="city"
              name="city"
              value={this.state.newEvent.city}
              label="City"
              fullWidth
              autoComplete="address-city"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
            inputProps={{ maxLength: 100}} 
              id="province"
              name="province"
              value={this.state.newEvent.province}
              label="Province"
              fullWidth
              autoComplete="address-province"
              onChange={this.handleChange}
            />
          </Grid>
  
        </Grid>
      </React.Fragment>
  
      <Button 
        type="submit"
        variant="contained"
        style={{ borderRadius: 25, position:'absolute', right:'175px', marginTop:'50px', backgroundColor:'#5da4a9', color:'white'}}> 
        Create
      </Button>
            
            </form>
          </div>
      );
  }
}

export default EditEvent;