import React from 'react';
import Container from '@material-ui/core/Container';
import EventCard from '../components/EventCard';
import { GridList, GridListTile } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

/**
 * Props:
*      { event }     event content  
 */
export default class MyEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (this.props.events.length > 0)
        return (
            <Container maxWidth="md">
                <GridList cellHeight="auto" className="event-card-list" cols={4} spacing={10}>
                {this.props.events.map(event => (
                    <GridListTile cols={1} style={{ height: '30vw' }} key={event.key}>
                        <EventCard key={event.key} id={event.id} event={event.name} time={event.starttime} place={event.place} isAdmin={event.isAdmin}></EventCard>
                    </GridListTile>
                ))}
                </GridList>
            </Container>
        );
        else {
            return (
                <Container maxWidth="md" style={{position: 'relative', height: '15vh'}}>
                    <Typography variant="subtitle1" style={{ position: 'absolute', letterSpacing:'0.05em', color:'#95cbe8', top: '25%', left: '40%', transform: 'translateY(-50%)'}}>
                        No events here!
                    </Typography>
                </Container>);
        }
    }
}