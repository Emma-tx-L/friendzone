import React from 'react';
import axios from "axios";
class Event extends React.Component {
  state = {
    name: '',
  }

  async componentDidMount() {
    let pathArr = window.location.pathname.split('/');
    const id = pathArr[2];
      try{
        const res = await axios.get("http://localhost:5000/api/event/my-events/" + id);
        if (res && res.status == 200){
          const event = res.data[0];
          const name = event.name;
          this.setState({name: name});
        } else {
          this.setState({name: 'unable to find'})
        }
      } catch (err){
        console.log('err: ' + err);
      }
  }

  render() {
    //TODO Display all the other event information besides name
    //TODO: Use Moment for dates.
    //TODO: Style
    const name = this.state.name && this.state.name
    return (
        <React.Fragment>
          <h1>{name}</h1>
        </React.Fragment>
    );
  }
}

export default Event;