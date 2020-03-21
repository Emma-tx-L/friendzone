import React from 'react';
import Navbar from '../components/Navbar';

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
        <Navbar>
        </Navbar >
          <h1>Home</h1>
      </Container>
    );
  }
}

export default Home;