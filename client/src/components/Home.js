import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CategoryCard from './CategoryCard';
import { GridList, GridListTile } from '@material-ui/core';
import axios from "axios";
import EventGrid from '../components/EventGrid';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highestRatedEvents: [],
      mostPopularEvents: [],
      allRegisteredEvents: []
    };
    // sorry, hack to get images showing, these have been uploaded to a private twitter account
    // - Emma
    const fitnessURL = 'https://pbs.twimg.com/media/EUTTGIZUMAAUQ2W?format=png&name=small';
    const techURL = 'https://pbs.twimg.com/media/EUTXv-yU4AAy6cp?format=png&name=small';
    const musicURL = 'https://pbs.twimg.com/media/EUTXv-wU0AApjWW?format=png&name=small';
    const artsURL = 'https://pbs.twimg.com/media/EUTXv-vUMAE3VpT?format=png&name=small';
    const foodndrinkURL = 'https://pbs.twimg.com/media/EUTXv-wUEAARxg3?format=png&name=small';
    this.activityTypes = [
      {type: 'Fitness', img: fitnessURL},
      {type: 'Technology', img: techURL},
      {type: 'Music', img: musicURL},
      {type: 'Arts', img: artsURL},
      {type: 'Food & Drink', img: foodndrinkURL}
    ]
  }

  componentDidMount() {
    this.getEvent("highest-rated", "highestRatedEvents");
    this.getEvent("popular", "mostPopularEvents");
    this.getEvent("all-registered", "allRegisteredEvents");
  }

  getEvent = async (url, stateName) => {
    const res = await axios.get("http://localhost:5000/api/special/" + url);
    const events = [];
    if (res.data.length > 0 && Array.isArray(res.data)){
      res.data.forEach((result) => {
          const date = new Date(result.starttime);
          const datestring = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'2-digit',});
          const event = {
              key: `${result.id} ${datestring}`,
              id: result.id,
              name: result.name,
              starttime: datestring,
              date: date,
              place: `${result.streetnumber} ${result.streetname}`,
              isAdmin: result.isadmin
          }
          events.push(event);
        })
      this.setState({
        [stateName]: events
      })
    }
  }

  render() {
    return (
      <Container>
        <Container maxWidth="md" style={{position: 'relative', height: '15vh'}}>
          <Typography variant="h3" style={{ position: 'absolute', fontWeight:'bold',letterSpacing:'0.05em', top: '65%', left: '3vh', transform: 'translateY(-50%)'}}>
            HOME
          </Typography>
        </Container>
        <Container maxWidth="md" style={{position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
              Search By Category
            </Typography>
        </Container>
        <Container maxWidth="md">
          <GridList cellHeight="auto" className="category-card-list" cols={2} spacing={30}>
          {this.activityTypes.map(category => (
              <GridListTile cols={1} style={{ height: 'auto' }} key={category.type}>
                  <CategoryCard type={category.type} image={category.img}/>
              </GridListTile>
          ))}
          </GridList>
        </Container>
        <Container maxWidth="md" style={{position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
              Hot n Upcoming Events
            </Typography>
        </Container>
        <EventGrid 
                events = {this.state.mostPopularEvents}
                action = "register"
        />
        <Container maxWidth="md" style={{position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
              Highest Rated Events
            </Typography>
        </Container>
        <EventGrid 
                events = {this.state.highestRatedEvents}
        />
        <Container maxWidth="md" style={{position:'relative', height: '10vh'}}>
            <Typography variant="h6" style={{position:'absolute', color:'grey', letterSpacing:'0.05em', top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
              Everyone Is Here!
            </Typography>
        </Container>
        <EventGrid 
                events = {this.state.allRegisteredEvents}
        />
      </Container>
    );
  }
}

export default Home;