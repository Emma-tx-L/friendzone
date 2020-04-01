import React from 'react';
import ReactDOM from 'react-dom';
import '../src/stylesheets/index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import MyEvents from './components/MyEvents';
import EventPage from './components/EventPage';
import EditEvent from './components/EditEvent';

const App = (
    <Router>
        <Navbar/>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/login" component={Login} />
        <div className="pages">
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/my-events" component={MyEvents} />
          <Route exact path="/my-events/:id" component={EventPage} />
          <Route exact path="/edit-event" component={EditEvent} />
        </div>
    </Router>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
