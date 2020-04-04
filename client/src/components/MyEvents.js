import React from 'react';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import EventCard from '../components/EventCard';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import EventGrid from '../components/EventGrid';
import { Redirect } from "react-router-dom";

export default class MyEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            upcomingEvents: [],
            adminEvents: [],
            pastEvents: [],
            redirect: false
        };
        this.colour = '#ffffff';
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
    }

    componentDidMount() {
        this.getMyEvents();
    }

    async handleCreateEvent(){
        this.setState({redirect: true});
    }

    handleRedirect(){
        if (this.state.redirect){
            return ( 
            <Redirect
            to={{
              pathname: "/edit-event",
              state: { id: false }

            }}
          />
        )};
    }

    getMyEvents = async () => {
        const profile = localStorage.getItem('profileID');
        const res = await axios.get("http://localhost:5000/api/event/my-events?" + 'profile=' + profile);
        const fetchedEvents = [];
        if (res.data.length > 0 && Array.isArray(res.data)){
            res.data.forEach((result) => {
                const date = new Date(result.starttime);
                const datestring = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'2-digit',});
                const event = {
                    key: `${result.eventid} ${datestring}`,
                    id: result.eventid,
                    name: result.name,
                    starttime: datestring,
                    date: date,
                    place: `${result.streetnumber} ${result.streetname}`,
                    isAdmin: result.isadmin
                }

                fetchedEvents.push(event);
            })
            this.setState({ events: fetchedEvents});
            this.sortMyEvents();
        }
        else {
            alert('No events registered');
        }
    }

    sortMyEvents = () => {
        const upcomingEvents = [];
        const adminEvents = [];
        const pastEvents = [];
        this.state.events.forEach(event => {
            if(event.isAdmin) {
                adminEvents.push(event)
            }
            if (event.date < Date.now()) {
                pastEvents.push(event);
            } else {
                upcomingEvents.push(event);
            }
        })

        this.setState({ pastEvents: pastEvents});
        this.setState({ upcomingEvents: upcomingEvents});
        this.setState({ adminEvents: adminEvents});
    }

    render() {
        return (
        <Container component="main">
            <Container maxWidth="md" style={{position: 'relative', height: '15vh'}}>
                <Typography variant="h3" style={{ position: 'absolute', fontWeight:'bold',letterSpacing:'0.05em', top: '65%', left: '3vh', transform: 'translateY(-50%)'}}>
                    YOUR EVENTS
                </Typography>
            </Container>
            <Container maxWidth="md" style={{position: 'relative', height: '8vh'}}>
                <Button
                    onClick={() => this.handleCreateEvent()}
                    variant="contained"
                    style={{ borderRadius: 25, position:'absolute', right:'50px', backgroundColor:'#5da4a9', color:'white'}}
                > 
                    Create Event
                </Button>
                {this.handleRedirect()}
            </Container>
            <Container maxWidth="md" style={{position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
                    Upcoming Events
                </Typography>
            </Container>
            <EventGrid 
                events = {this.state.upcomingEvents}
                action = "unregister"
                delete = {false}
            />
            <Container maxWidth="md" style={{position:'relative', height: '10vh'}}>
                <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
                    Created By You
                </Typography>
            </Container>
            <EventGrid 
                events = {this.state.adminEvents}
                action = "edit"
                delete = {true}
            />
            <Container maxWidth="md" style={{position:'relative', height: '10vh'}}>
                <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
                    Past Events
                </Typography>
            </Container>
            <EventGrid 
                events = {this.state.pastEvents}
                delete = {false}
            />
        </Container>
        );
    }
}