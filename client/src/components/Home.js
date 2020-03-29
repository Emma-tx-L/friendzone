import React from 'react';
import MyEvents from './MyEvents';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CategoryCard from './CategoryCard';
import { GridList, GridListTile } from '@material-ui/core';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const testURL = `/src/assets/categories_fitness.png`;
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
  render() {
    return (
      <Container>
        <Container maxWidth="md" style={{position: 'relative', height: '25vh'}}>
          <Typography variant="h3" style={{ position: 'absolute', fontWeight:'bold',letterSpacing:'0.05em', top: '40%', left: '3vh', transform: 'translateY(-50%)'}}>
            HOME
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
      </Container>
    );
  }
}

export default Home;