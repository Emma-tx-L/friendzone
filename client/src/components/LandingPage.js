import React from 'react';
import '../stylesheets/LandingPage.css';

import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core';

export default class LandingPage extends React.Component {

  constructor(props) {
    super(props);
}

  render(){
    return (
      <div>
        <header>
          <h1 className="logo">FriendZone</h1>
          <div>
          <Button variant="contained" className="btn" disableElevation>
              <Link className="link" to="/login">Login</Link>
          </Button>
          </div>
        </header>
        <div className="splash">
          <div className="content">


          <h1 className="logo">FriendZone</h1>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium eius</h2>
          <Button variant="contained" className="btn" disableElevation>
            <Link className="link" to="/login">Login</Link>
          </Button>
          </div>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium eius, rerum dolorum libero est facilis eaque provident consequatur fugiat fugit deleniti reiciendis quisquam! Eos nesciunt reprehenderit odio adipisci officia.
          Modi sint eaque ad corrupti voluptatum tempora exercitationem vitae, eos at dolorum earum recusandae doloremque in consequuntur consequatur rem nobis dolore, aliquam cum sunt dolorem, quibusdam perspiciatis odio. Officiis, ducimus?</p>
        </div>
        
         <footer className="logo">FriendZone</footer>
      </div>
    );
  }
}
