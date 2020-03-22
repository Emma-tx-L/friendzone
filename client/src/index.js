import React from 'react';
import ReactDOM from 'react-dom';
import '../src/stylesheets/index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from './components/Login';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import MyEvents from './components/MyEvents';

const App = (
    <Router>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home}/>
        <Route path="/my-events" component={MyEvents}/>

     </Router>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
