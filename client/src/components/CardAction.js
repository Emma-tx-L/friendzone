import React from 'react';
import Button from '@material-ui/core/Button';

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

    handleActionClick = async () => {
        this.setState({clicked: true});
    }

    unregisterEvent = async (profileID) => {
        const res = await axios.delete(`http://localhost:5000/api/event/register/${this.props.eventID}/${profileID}`);
        return res;
    }

    registerEvent = async (profileID) => {
        const res = await axios.put(`http://localhost:5000/api/event/register/${this.props.eventID}/${profileID}`);
        return res;
    }

    handleAction = () => {
        if (this.state.redirect) {
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
            }
        }
    }

    /**
     * props:
     * 
     */
    render() {
        <Button onClick={() => this.handleActionClick()} size="small" color="primary" className="card_action" 
                style={{position:'absolute', bottom: '1vw', right: '1vw', }}>
                    {this.props.text}
        </Button>
    }
}