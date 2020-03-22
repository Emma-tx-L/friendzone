import React from 'react';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import EventCard from '../components/EventCard';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { GridList } from '@material-ui/core';
  
export default class MyEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
        this.colour = '#ffffff';
    }

    getMyEvents = async () => {
        const profile = localStorage.getItem('profileID');
        const res = await axios.get("http://localhost:5000/api/event/my-events?" + 'profile=' + profile);
        const fetchedEvents = [];
        if (res.data.length > 0){
            res.data.forEach((result) => {
                const event = {
                    id: result.eventid,
                    name: result.name,
                    starttime: result.starttime,
                    place: `${result.streetnumber} ${result.streetname}`
                }

                fetchedEvents.push(event);
            })
            console.log(res.data);
            console.log(this.events);
            this.setState({ events: fetchedEvents});
        }
        else {
            alert('No events registered');
        }
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
            <Container maxWidth="md" style={{backgroundColor: this.colour, position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
                    Created By You
                </Typography>
            </Container>
            <Container maxWidth="md" style={{backgroundColor: this.colour, position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
                    Past Events
                </Typography>
            </Container>
            <Container maxWidth="md" style={{backgroundColor: this.colour }}>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={this.getMyEvents}
                    >
                        Get Events
                    </Button>
                    <GridList cellHeight="auto" className="event-card-list" cols={5} spacing={10}>
                    {this.state.events.map(event => (
                        <EventCard key={event.id} id={event.id} event={event.name} time={event.starttime} place={event.place}></EventCard>
                    ))}
                    </GridList>
            </Container>
        </Container>
        );
    }
}