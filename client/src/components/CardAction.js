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
            clicked: false,
        };
    }

    checkValidAction = () => {
        return (this.props.action === "unregister" || this.props.action === "edit" || this.props.action === "register");
    }

    handleActionClick = async () => {
        this.setState({clicked: true});
    }

    unregisterEvent = async (profileID) => {
        const res = await axios.delete(`http://localhost:5000/api/event/register/`, {
            body: {
                profileID,
                eventID: this.props.eventID
            },
            headers: {"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"}
        });
        console.log(res);
        return res;
    }

    registerEvent = async (profileID) => {
        const res = await axios.post(`http://localhost:5000/api/event/register`, {
            profileID,
            eventID: this.props.eventID
        });
        console.log(res);
        if (res.status != 200) {
            alert("There was an error, please try again later.")
        } else if (res.data && res.data.detail && res.data.detail.includes("already exists")) {
            alert("You're already registered for this event!")
        } else if (res.data === []) {
            alert("You're now registered!")
        }
        return;
    }

    handleAction = () => {
            const profileID = localStorage.getItem('profileID');
            let redirectPath = window.location.pathname; // redirect to same page by default
    
            if (this.props.action === "edit") {
                // TODO: redirectPath = edit-page-path
                return (
                    <Redirect
                    to={{
                        pathname: redirectPath
                    }}
                    />
                );
            } else if (this.props.action === "unregister") {
                this.unregisterEvent(profileID);
                return;
            } else if (this.props.action === "register") {
                this.registerEvent(profileID);
                return;
            } else {
                return;
            }
    }


    render() {
        if (this.checkValidAction()) {
            return (
            <Button onClick={() => this.handleAction()} size="small" color="primary" className="card_action" 
                    style={{position:'absolute', bottom: '1vw', right: '1vw', }}>
                        {this.props.action}
            </Button>)
        } else {
            return null;
        }
    }
}