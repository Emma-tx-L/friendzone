import React from 'react';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import EventCard from '../components/EventCard';
import axios from "axios";
import { GridList } from '@material-ui/core';

export default class MyEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.events = []
    }

    getMyEvents = async () => {
        const profile = localStorage.getItem('profileID');
        const res = await axios.get("http://localhost:5000/api/event/my-events?" + 'profile=' + profile);
        const events = [];
        if (res.data.length > 0){
            res.data.forEach((result) => {
                const event = {
                    id: result.eventid,
                    name: result.name,
                    starttime: result.starttime,
                    place: `${result.streetnumber} ${result.streetname}`
                }

                this.events.push(event);
            })
            console.log(res.data);
            console.log(this.events);
            this.forceUpdate();
        }
        else {
        alert('No events registered');
        }
    }
  

    render() {
        return (
        <Container component="main">
            <Button
                variant="contained"
                color="default"
                onClick={this.getMyEvents}
            >
                Get Events
            </Button>
            <GridList cellHeight="auto" className="event-card-list" cols={5} spacing={10}>
            {this.events.map(event => (
                <EventCard key={event.id} event={event.name} time={event.starttime} place={event.place}></EventCard>
            ))}
            </GridList>
        </Container>
        );
    }
}