import React from 'react';
import axios from "axios";
import ChatMessage from './ChatMessage';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import io from "socket.io-client";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import moment from 'moment';

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
    this.socket.on('JOIN_CHAT', () => console.log('You joined the cat'));
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
        console.log('res: ' + JSON.stringify(res));
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
        const res = await axios.get("http://localhost:5000/api/chat/" + chatId);
        if (res && res.status == 200){
          const chatComments = res.data;
          this.setState({chat: chatComments});
        }
      } catch (err){
        console.log('err: ' + err);
      }
  }

  sendMessage = () => {
    const time = moment().format();
    const firstName = localStorage.getItem('firstname');
    //Using localStorage for profile id is a problem when testing
    const profileId = localStorage.getItem('profileID');
    this.socket.emit('CHAT_MESSAGE', {chatid: this.state.chatId, content: this.state.message, time: time, firstname: firstName, profileid: profileId  });
    //TODO: store chat message in db!
  }

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    //TODO: Use Moment for dates.
    //TODO: Style
    const name = this.state.event?.name;
    const starttime = this.state.event?.starttime;
    const endtime = this.state.event?.endtime;
    const description = this.state.event?.description;
    const activitytype = this.state.event?.activitytype;
    const activitylevel = this.state.event?.activitylevel;
    const streetname = this.state.event?.streetname;
    const streetnumber = this.state.event?.streetnumber;
    const postalcode = this.state.event?.postalcode;
    const chatMessages = this.state.chat && this.state.chat;
    return (
        <Container>
          <h1>{name}</h1>
          <h3>{description}</h3>
          <h3>Type: {activitytype} Level: {activitylevel}</h3>
          <h3>Start: {starttime} End: {endtime}</h3>
          <h3>Location: {streetnumber} {streetname} {postalcode}</h3>
          <List >
            {chatMessages?.map((chatMessage) => <ChatMessage name={chatMessage.firstname} content={chatMessage.content} time={chatMessage.time}/>)}
          </List>
          <TextField
            variant="outlined"
            margin="normal"
            id="message"
            label="message"
            name="message"
            autoComplete="message"
            autoFocus
            onChange={this.handleMessageChange}
          />
          <br></br>
          <Button onClick={this.sendMessage}>Send Message</Button>
        </Container>
    );
  }
}

export default Event;