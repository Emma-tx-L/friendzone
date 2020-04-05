import React from 'react';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { Redirect } from "react-router-dom";

/**
 * props:   
 *      action      {string} one of: 'unregister', 'edit', 'register'
*       eventID      event ID
 */
export default class CardAction extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
        this.redirectPath =  window.location.pathname;
    }

    checkValidAction = () => {
        return (this.props.action === "unregister" || this.props.action === "edit" || this.props.action === "register");
    }

    setRedirect = async () => {
        this.setState({redirect: true});
    }

    unregisterEvent = async (profileID) => {
        const res = await axios.post(`http://localhost:5000/api/event/unregister/`, {
                profileID,
                eventID: this.props.eventID
            });
        try {
            if (res.status != 200) {
                alert("There was an error, please try again later.");
            } else if (res.data.length == 0) {
                alert("You have unregistered from the event");
            }
        } catch (e) {
            console.log(e);
            alert("There was an error, please try again later.");
        }
        return;
    }

    registerEvent = async (profileID) => {
        const res = await axios.post(`http://localhost:5000/api/event/register`, {
            profileID,
            eventID: this.props.eventID
        });
        try {
            if (res.status != 200) {
                alert("There was an error, please try again later.");
            } else if (res.data && res.data.detail && res.data.detail.includes("already exists")) {
                alert("You're already registered for this event!");
            } else if (res.data.length == 0) {
                alert("You're now registered!");
            }
        } catch (e) {
            console.log(e);
            alert("There was an error, please try again later.");
        }
        return;
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return (
            <Redirect
              to={{
                pathname: this.redirectPath,
                state: { id: this.props.eventID }
              }}
            />
          );
        }
      }

    handleAction = () => {
            const profileID = localStorage.getItem('profileID'); 
            if (this.props.action === "edit") {
                this.redirectPath = "/edit-event";
                this.setRedirect();
            } else if (this.props.action === "unregister") {
                this.unregisterEvent(profileID);
                window.location.reload();
            } else if (this.props.action === "register") {
                this.registerEvent(profileID);
            }

            return;
    }

    handleDelete = async () => {
        const res = await axios.post(`http://localhost:5000/api/event/delete/`, {
            eventID: this.props.eventID
        });
        try {
            if (res.status != 200) {
                alert("There was an error, please try again later.");
            } else if (res.data.length == 0) {
                alert("You have deleted the event");
            }
        } catch (e) {
            console.log(e);
            alert("There was an error, please try again later.");
        }
        window.location.reload();
    }


    render() {
        if (this.checkValidAction()) {
            return (
            <React.Fragment>
                <Button onClick={() => this.handleAction()} size="small" color="primary" className="card_action" 
                    style={{fontFamily: "'Montserrat', sans-serif", position:'absolute', bottom: '1vw', right: '1vw', }}>
                        {this.renderRedirect()}
                        {this.props.action}
                </Button>
                {this.props.delete &&
                <Button onClick={() => this.handleDelete()} size="small" color="primary" className="card_action" 
                    style={{fontFamily: "'Montserrat', sans-serif", position:'absolute', bottom: '1vw', left: '1vw', }}>
                    {this.renderRedirect()}
                    Delete
                </Button> }
            </React.Fragment>
            )
        } else {
            return null;
        }
    }
}