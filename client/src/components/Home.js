import React from 'react';

import MyEvents from './MyEvents';
import Container from '@material-ui/core/Container';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Container>
        <h1>Home</h1>
      </Container>
    );
  }
}

export default Home;