import React from 'react';
import axios from "axios";
import ChatMessage from './ChatMessage';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import '../stylesheets/EventPage.css';
import Typography from '@material-ui/core/Typography';
import ReviewList from './ReviewList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { ListItem, ListItemText } from "@material-ui/core";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect("http://localhost:5000/");
    this.state = {
      event: null,
      eventID: null,
      chat: null,
      chatId: null,
      message: "",
      usersList: [],
      checkboxes: {
        name: false,
        starttime: false,
        endtime: false,
        description: false,
        streetnumber: false,
        streetname: false,
        postalcode: false,
        activitytype: false,
        activitylevel: false,
      }
    };
  }
  
  async componentDidMount() {
    this.socket.on('JOIN_CHAT', () => console.log('You joined the chat'));
    this.socket.on('CHAT_MESSAGE', (message) => {
      let currentChat = this.state.chat;
      currentChat.push(message);
      this.setState({chat: currentChat});
    });
    let pathArr = window.location.pathname.split('/');
    const id = pathArr[2];
    this.setState({eventID: id});
    let chatId;
      try{
        const res = await axios.get("http://localhost:5000/api/event/my-events/" + id);
        if (res && res.status == 200){
          const event = res.data[0];
          chatId = event.chatid;
          this.socket.emit('JOIN_CHAT', chatId);
          this.setState({
            event: event,
            chatId: chatId
          });
        } else {
          this.setState({name: 'unable to find'})
        }
      } catch (err){
        console.log('err: ' + err);
      }

      //Should I just put this in the above try catch?
      try{
        const res = await axios.get("http://localhost:5000/api/chatcomment/" + chatId);
        if (res && res.status == 200){
          const chatComments = res.data;
          this.setState({chat: chatComments});
        }
      } catch (err){
        console.log('err: ' + err);
      }
  }

  sendMessage = async () => {
    const time = moment().format();
    const content = this.state.message;
    const chatid = this.state.chatId;
    const firstName = localStorage.getItem('firstname');
    //Using localStorage for profile id is a problem when testing
    const profileid = localStorage.getItem('profileID');
    this.socket.emit('CHAT_MESSAGE', {chatid: chatid, content: content, time: time, firstname: firstName, profileid: profileid  });
    const chatCommentToPost = { time, content, chatid, profileid };
    const res = await axios.post("http://localhost:5000/api/chatcomment/", chatCommentToPost);
    console.log('res: ' + res);
  }

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  handleEnterPressed = (event) => {
    event.preventDefault();
    const code = event.keyCode || event.which;
    if (code === 13) {
      this.sendMessage();
    }
  };

  handleChange = async (event) => {
    this.setState(Object.assign(this.state.checkboxes, { [event.target.name]: event.target.checked }));
    let checkboxes = this.state.checkboxes;
    let checked = [];
    for(var key in checkboxes) {
      if (checkboxes[key] === true){
        checked.push(key);
      }
    }
    await this.fetchEventData(this.state.eventID, checked);
  };

  handleUsersDisplayRegistered = async () => {
    let pathArr = window.location.pathname.split('/');
    const id = pathArr[2];
    try{
      const res = await axios.get("http://localhost:5000/api/event/my-events/registered/" + id);
      if (res && res.status == 200){
        this.setState({ usersList: res.data })
      }
    } catch (err){
      console.log('err: ' + err);
    }
  }

  handleUsersDisplayNotRegistered = async () => {
    let pathArr = window.location.pathname.split('/');
    const id = pathArr[2];
    try{
      const res = await axios.get("http://localhost:5000/api/event/my-events/notregistered/" + id);
      if (res && res.status == 200){
        this.setState({ usersList: res.data })
      }
    } catch (err){
      console.log('err: ' + err);
    }
  }

  async fetchEventData(id, checked){
    console.log(checked, id)
    try {
      const res = await axios.get("http://localhost:5000/api/event/choices",  { data: {id: id, checked: checked}});
      if (res && res.status == 200){
        console.log(res.data[0]);
      }
    } 
    catch (err) {
      console.log('err fetching event attr' + err);
    }
  }


  render() {
    const name = this.state.event?.name;
    const starttime = moment(this.state.event?.starttime).format('MMMM Do YYYY, h:mm a');
    const endtime = moment(this.state.event?.endtime).format('MMMM Do YYYY, h:mm a');
    const description = this.state.event?.description;
    const activitytype = this.state.event?.activitytype;
    const activitylevel = this.state.event?.activitylevel;
    const streetname = this.state.event?.streetname;
    const streetnumber = this.state.event?.streetnumber;
    const postalcode = this.state.event?.postalcode;
    const chatMessages = this.state.chat && this.state.chat;
    const eventid = this.state.event?.id;
    const isPast = this.state.event && moment(this.state.event?.starttime).isBefore(moment());
    const usersList = this.state.usersList;
    return (
        <Container>
          <Container>
          <Paper className="paper">
          {/* <FormControlLabel
            control={ <Checkbox checked={this.state.all} onChange={this.handleChange} name="all" color="primary"/>} label="All"
          /> */}
           <FormControlLabel
            control={ <Checkbox checked={this.state.name} onChange={this.handleChange} name="name" color="primary"/>} label="Name"
          />
           <FormControlLabel
            control={ <Checkbox checked={this.state.starttime} onChange={this.handleChange} name="starttime" color="primary"/>} label="Start Time"
          />
          <FormControlLabel
            control={ <Checkbox checked={this.state.endtime} onChange={this.handleChange} name="endtime" color="primary"/>} label="End Time"
          />
          <FormControlLabel
            control={ <Checkbox checked={this.state.description} onChange={this.handleChange} name="description" color="primary"/>} label="Description"
          />
           <FormControlLabel
            control={ <Checkbox checked={this.state.streetnumber} onChange={this.handleChange} name="streetnumber" color="primary"/>} label="Apt Number"
          />
           <FormControlLabel
            control={ <Checkbox checked={this.state.streetname} onChange={this.handleChange} name="streetname" color="primary"/>} label="Street"
          />
          <FormControlLabel
            control={ <Checkbox checked={this.state.postalcode} onChange={this.handleChange} name="postalcode" color="primary"/>} label="Postal Code"
          />
          <FormControlLabel
            control={ <Checkbox checked={this.state.activitytype} onChange={this.handleChange} name="activitytype" color="primary"/>} label="Activity Type"
          />
          <FormControlLabel
            control={ <Checkbox checked={this.state.activitylevel} onChange={this.handleChange} name="activitylevel" color="primary"/>} label="Activity Level"
          />

            <Typography className="title" variant="h3" style={{fontFamily: "'Montserrat', sans-serif", paddingBottom:'2rem'}}>{name}</Typography>
            <Typography className="nested" variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>What is it? <span style={{marginLeft: "3px", color: 'black'}}>{description}</span></Typography>
            <Typography className="nested"variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>Type: <span style={{marginLeft: "3px", color: 'black'}}>{activitytype}</span></Typography>
            <Typography className="nested"variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>Level: <span style={{marginLeft: "3px", color: 'black'}}>{activitylevel}</span></Typography>
            <Typography className="nested" variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>Start:  <span style={{marginLeft: "3px", color: 'black', marginRight: "3px"}}>{starttime}</span></Typography>
            <Typography className="nested"variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>End: <span style={{marginLeft: "3px", color: 'black'}}>{endtime}</span></Typography>
            <Typography className="nested" variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>Location: <span style={{marginLeft: "3px", color: 'black'}}>{streetnumber} {streetname} {postalcode}</span></Typography>
          </Paper>
          </Container>

          <Container>
          <Paper  className="paper" style={{maxHeight: 400, overflow: 'auto'}}>
          <List >
            {chatMessages?.map((chatMessage) => <ChatMessage name={chatMessage.firstname} content={chatMessage.content} time={chatMessage.time}/>)}
          </List>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="message"
            label="message"
            name="message"
            autoComplete="message"
            autoFocus
            onChange={this.handleMessageChange}
            onKeyUp={this.handleEnterPressed}
          />
          </Paper>
          </Container>
          {isPast && <ReviewList eventid={eventid}/>}
          <Paper className="paper" style={{maxHeight: 400, overflow: 'auto'}}>
            <List>
              {usersList?.map((user) =>
              <ListItem divider>
                  <ListItemText primary={user.email} />
              </ListItem>)
              }
            </List>
            <Button style={{ marginRight: "1em" }} variant="contained" color="primary" onClick={this.handleUsersDisplayRegistered}>Display all registered users</Button>
            <Button variant="contained" color="primary" onClick={this.handleUsersDisplayNotRegistered}>Display users who are not registered</Button>
          </Paper>
        </Container>
    );
  }
}

export default Event;