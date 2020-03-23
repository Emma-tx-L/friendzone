import React from 'react';
import Container from '@material-ui/core/Container';
import EventCard from '../components/EventCard';
import { GridList, GridListTile } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

/**
 * Props:
*      { colour }    grid background colour
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
            <Container maxWidth="md" style={{backgroundColor: this.props.colour }}>
                <GridList cellHeight="auto" className="event-card-list" cols={5} spacing={10}>
                {this.props.events.map(event => (
                    <GridListTile cols={1} style={{ height: 'auto' }} key={event.id}>
                        <EventCard key={event.id} id={event.id} event={event.name} time={event.starttime} place={event.place}></EventCard>
                    </GridListTile>
                ))}
                </GridList>
            </Container>
        );
        else {
            return (
                <Container maxWidth="md" style={{position: 'relative', backgroundColor: '#ffffff', height: '15vh'}}>
                    <Typography variant="subtitle1" style={{ position: 'absolute', letterSpacing:'0.05em', color:'#95cbe8', top: '25%', left: '40%', transform: 'translateY(-50%)'}}>
                        No events here!
                    </Typography>
                </Container>);
        }
    }
}