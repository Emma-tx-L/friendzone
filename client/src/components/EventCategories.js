import React from 'react';
import Container from '@material-ui/core/Container';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import EventGrid from '../components/EventGrid';

export default class EventCategories extends React.Component {
    constructor(props) {
        super(props);
        let pathArr = window.location.pathname.split('/');
        this.type = pathArr[2];
        if (this.type === 'Food%20&%20Drink') {
            this.type = 'Food & Drink';
        }
        this.state = {
            events: []
        };
    }
    
    componentDidMount() {
        this.getEventsByCategory();
    }

    getEventsByCategory = async () => {
        const res = await axios.get("http://localhost:5000/api/event/upcoming/" + this.type);
        const fetchedEvents = [];
        if (res.data.length > 0 && Array.isArray(res.data)){
            res.data.forEach((result) => {
                const date = new Date(result.starttime);
                const datestring = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'2-digit',});
                const event = {
                    key: `${result.id} ${result.name}`,
                    id: result.id,
                    name: result.name,
                    starttime: datestring,
                    date: date,
                    place: `${result.streetnumber} ${result.streetname}`
                }

                fetchedEvents.push(event);
            })
            this.setState({ events: fetchedEvents});
        }
    }

    render() {
        return (
        <Container component="main">
            <Container maxWidth="md" style={{position: 'relative', height: '15vh'}}>
                <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", position: 'absolute', fontWeight:'bold',letterSpacing:'0.05em', top: '65%', transform: 'translateY(-50%)', textTransform: 'uppercase' }}>
                    {this.type}
                </Typography>
            </Container>
            <Container maxWidth="md" style={{position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{fontFamily: "'Montserrat', sans-serif", position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', transform: 'translateY(-50%)'}}>
                    Upcoming Events
                </Typography>
            </Container>
            <EventGrid 
                events = {this.state.events}
                action = "register"
            />
        </Container>
        );
    }
}