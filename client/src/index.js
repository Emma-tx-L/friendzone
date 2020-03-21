import React from 'react';
import ReactDOM from 'react-dom';
import '../src/stylesheets/index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';

const App = (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
