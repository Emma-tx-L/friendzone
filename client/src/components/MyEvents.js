import React from 'react';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import EventGrid from '../components/EventGrid';
  
export default class MyEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            upcomingEvents: [],
            adminEvents: [],
            pastEvents: []
        };
        this.colour = '#ffffff';
    }
    
    componentDidMount() {
        this.getMyEvents();
    }

    getMyEvents = async () => {
        const profile = localStorage.getItem('profileID');
        const res = await axios.get("http://localhost:5000/api/event/my-events?" + 'profile=' + profile);
        const fetchedEvents = [];
        if (res.data.length > 0){
            res.data.forEach((result) => {
                const date = new Date(result.starttime);
                const datestring = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'2-digit',});
                const event = {
                    id: result.eventid,
                    name: result.name,
                    starttime: datestring,
                    date: date,
                    place: `${result.streetnumber} ${result.streetname}`,
                    isAdmin: result.isadmin
                }

                fetchedEvents.push(event);
            })
            console.log(res.data);
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
            if (event.date > Date.now()) {
                pastEvents.push(event);
            } else {
                upcomingEvents.push(event);
                if(event.isAdmin) {
                    adminEvents.push(event)
                }
            }
        })

        this.setState({ pastEvents: pastEvents});
        this.setState({ upcomingEvents: upcomingEvents});
        this.setState({ adminEvents: adminEvents});
    }

    render() {
        return (
        <Container component="main">
            <Container maxWidth="md" style={{position: 'relative', backgroundColor: this.colour, height: '15vh'}}>
                <Typography variant="h3" style={{ position: 'absolute', fontWeight:'bold',letterSpacing:'0.05em', top: '65%', left: '3vh', transform: 'translateY(-50%)'}}>
                    YOUR EVENTS
                </Typography>
            </Container>
            <Container maxWidth="md" style={{backgroundColor: this.colour, position: 'relative', height: '8vh'}}>
                <Button
                    variant="contained"
                    style={{ borderRadius: 25, position:'absolute', right:'50px', backgroundColor:'#5da4a9', color:'white'}}
                >
                    Create Event
                </Button>
            </Container>
            <Container maxWidth="md" style={{backgroundColor: this.colour, position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
                    Upcoming Events
                </Typography>
            </Container>
            <EventGrid 
                colour = {this.colour}
                events = {this.state.upcomingEvents}
            />
            <Container maxWidth="md" style={{backgroundColor: this.colour, position:'relative', height: '10vh'}}>
                <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
                    Created By You
                </Typography>
            </Container>
            <EventGrid 
                colour = {this.colour}
                events = {this.state.adminEvents}
            />
            <Container maxWidth="md" style={{backgroundColor: this.colour, position:'relative', height: '10vh'}}>
                <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
                    Past Events
                </Typography>
            </Container>
            <EventGrid 
                colour = {this.colour}
                events = {this.state.pastEvents}
            />
        </Container>
        );
    }
}