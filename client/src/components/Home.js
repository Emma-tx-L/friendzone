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
    URL = './src/assets/categories_fitness.png';
    URL = '../assets/landingpage.png';
    this.activityTypes = [
      {type: 'Fitness', img: require(URL)},
      {type: 'Technology', img: URL},
      {type: 'Music', img: URL},
      {type: 'Arts', img: URL},
      {type: 'Food & Drink', img: URL}
    ]
  }
  render() {
    return (
      <Container>
        <Container maxWidth="md" style={{position: 'relative', backgroundColor: this.colour, height: '15vh'}}>
          <Typography variant="h3" style={{ position: 'absolute', fontWeight:'bold',letterSpacing:'0.05em', top: '65%', left: '3vh', transform: 'translateY(-50%)'}}>
            HOME
          </Typography>
        </Container>
        <Container maxWidth="md" style={{backgroundColor: this.props.colour }}>
          <GridList cellHeight="auto" className="category-card-list" cols={5} spacing={10}>
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