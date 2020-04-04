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

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect("http://localhost:5000/");
    this.state = {
      event: null,
      chat: null,
      chatId: null,
      message: "",
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

  render() {
    const name = this.state.event?.name;
    const starttime = moment(this.state.event?.starttime).format('MMMM Do YYYY, h:mm:ss a');
    const endtime = moment(this.state.event?.endtime).format('MMMM Do YYYY, h:mm:ss a');
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
            <Typography className="title" variant="h3">{name}</Typography>
            <Typography className="nested" variant="body1">What is it? <span style={{marginLeft: "3px", color: 'black'}}>{description}</span></Typography>
            <Typography className="nested"variant="body1">Type: <span style={{marginLeft: "3px", color: 'black'}}>{activitytype}</span></Typography>
            <Typography className="nested"variant="body1">Level: <span style={{marginLeft: "3px", color: 'black'}}>{activitylevel}</span></Typography>
            <Typography className="nested" variant="body1">Start:  <span style={{marginLeft: "3px", color: 'black', marginRight: "3px"}}>{starttime}</span></Typography>
            <Typography className="nested"variant="body1">End: <span style={{marginLeft: "3px", color: 'black'}}>{endtime}</span></Typography>
            <Typography className="nested" variant="body1">Location: <span style={{marginLeft: "3px", color: 'black'}}>{streetnumber} {streetname} {postalcode}</span></Typography>
          </Paper>
          </Container>

          <Container>
          <Paper style={{maxHeight: 200, overflow: 'auto'}}>
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
        </Container>
    );
  }
}

export default Event;