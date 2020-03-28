import React from 'react';
import axios from "axios";
import ChatMessage from './ChatMessage';

class Event extends React.Component {
  state = {
    event: null,
    chat: null,
  }

  async componentDidMount() {
    let pathArr = window.location.pathname.split('/');
    const id = pathArr[2];
    let chatId;
      try{
        const res = await axios.get("http://localhost:5000/api/event/my-events/" + id);
        console.log('res: ' + JSON.stringify(res));
        if (res && res.status == 200){
          const event = res.data[0];
          chatId = event.chatid;
          this.setState({
            event: event,
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
        <React.Fragment>
          <h1>{name}</h1>
          <h3>{description}</h3>
          <h3>Type: {activitytype} Level: {activitylevel}</h3>
          <h3>Start: {starttime} End: {endtime}</h3>
          <h3>Location: {streetnumber} {streetname} {postalcode}</h3>
          {chatMessages?.map((chatMessage) => <ChatMessage name={chatMessage.firstname} content={chatMessage.content} time={chatMessage.time}/>)}
        </React.Fragment>
    );
  }
}

export default Event;