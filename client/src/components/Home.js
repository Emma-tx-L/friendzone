import React from 'react';
import Navbar from '../components/Navbar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

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
        <Navbar/>
        <h1>Home</h1>
      </Container>
    );
  }
}

export default Home;