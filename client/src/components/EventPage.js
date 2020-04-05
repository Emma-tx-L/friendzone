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
import Button from "@material-ui/core/Button";

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
    this.handleChange = this.handleChange.bind(this);
    
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
            // event: event,
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

  handleChange = async (value) => {
    let fetchColumns = [];
    if (value === 'description') {
      fetchColumns = ['description','activitylevel','activitytype']
    }
  if (value === 'location') {
    fetchColumns = ['starttime','endtime','streetnumber','streetname','postalcode']
  }
  if (value === 'all'){
    for(var key in this.state.checkboxes) {
      fetchColumns.push(key);
    }
  }
    await this.fetchEventData(value, this.state.eventID, fetchColumns);
    this.updateStates(value)
  };

  updateStates(value) {
    if (value === 'description') {
      this.setState({
        checkboxes: {
          name: false,
          starttime: false,
          endtime: false,
          description: true,
          streetnumber: false,
          streetname: false,
          postalcode: false,
          activitytype: true,
          activitylevel: true,
        }})
  }
  if (value === 'location') {
    this.setState({
      checkboxes: {
        name: false,
        starttime: true,
        endtime: true,
        description: false,
        streetnumber: true,
        streetname: true,
        postalcode: true,
        activitytype: false,
        activitylevel: false,
      }
    })
  }
  if (value === 'all'){
    this.setState({
      checkboxes: {
        name: true,
        starttime: true,
        endtime: true,
        description: true,
        streetnumber: true,
        streetname: true,
        postalcode: true,
        activitytype: true,
        activitylevel: true,
      }
    })
  }
  }

  async fetchEventData(value, id, checked){
    try {
      const res = await axios.get("http://localhost:5000/api/event/my-choices/" + checked + '/' + id + '/' + value);
      if (res && res.status == 200){
        const event = res.data[0];
        this.setState({
          event: event
        });
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
    return (
        <Container>
          <Container>
          <Paper className="paper">

        
              <Button
              onClick={() => this.handleChange('all')}
              variant="contained"
              value="all"
              checked={this.state.checkboxes.name}
              style={{ borderRadius: 25, backgroundColor:'#5da4a9', right:'1rem', bottom:'1rem', color:'white'}}>Show all details</Button>
             
             <Button
              onClick={() => this.handleChange('description')}
              variant="contained"
              value="description"
              checked={this.state.checkboxes.description}
              style={{ borderRadius: 25, right:'1rem', bottom:'1rem', backgroundColor:'#5da4a9', color:'white'}}>Show description</Button>

              <Button
              onClick={() => this.handleChange('location')}
              variant="contained"
              value="location"
              checked={this.state.checkboxes.description}
              style={{ borderRadius: 25, backgroundColor:'#5da4a9', right:'1rem', bottom:'1rem', color:'white'}}>Show location and time</Button>
          
          { this.state.checkboxes.name  &&
            <Typography className="title" variant="h3" style={{fontFamily: "'Montserrat', sans-serif", paddingBottom:'2rem'}}>{name}</Typography>
            }

            {
              this.state.checkboxes.description && 
            <Typography className="nested" variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>What is it? <span style={{marginLeft: "3px", color: 'black'}}>{description}</span></Typography>
            }

            {
            this.state.checkboxes.activitytype && 
            <Typography className="nested"variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>Type: <span style={{marginLeft: "3px", color: 'black'}}>{activitytype}</span></Typography>
            }
            {
            this.state.checkboxes.activitylevel && 
            <Typography className="nested"variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>Level: <span style={{marginLeft: "3px", color: 'black'}}>{activitylevel}</span></Typography>
            }
            {
            this.state.checkboxes.starttime && 
            <Typography className="nested" variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>Start:  <span style={{marginLeft: "3px", color: 'black', marginRight: "3px"}}>{starttime}</span></Typography>
            }   
            {
              this.state.checkboxes.endtime && 
              <Typography className="nested"variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>End: <span style={{marginLeft: "3px", color: 'black'}}>{endtime}</span></Typography>
              }
            {
              this.state.checkboxes.streetnumber && 
              <Typography className="nested" variant="body1" style={{fontFamily: "'Montserrat', sans-serif"}}>Location: <span style={{marginLeft: "3px", color: 'black'}}>{streetnumber} {streetname} {postalcode}</span></Typography>
              }
        
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
          {isPast && this.state.checkboxes.name && <ReviewList eventid={eventid}/>}
        </Container>
    );
  }
}

export default Event;