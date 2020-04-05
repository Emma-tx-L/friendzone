import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import '../stylesheets/EventCard.css';
import CardAction from './CardAction';

/**
 * props
 *      action      {string} one of: 'unregister', 'edit', 'register'
 *      event       
 *      time
 *      place
 */
export default class MediaCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            id: props.id
        };
        this.handleEventClick = this.handleEventClick.bind(this);
    
        this.colours = [
            '#82a0ff',
            '#ff94f4',
            '#beffb0',
            '#78ffe4',
            '#fffb78',
            '#ff9a3b',
            '#ff4a5f',
            '#795dd4',
            '#c2ff78',
            '#eb78c4',
            '#ffe985',
            '#7affcc'
        ]
    }

    async handleEventClick() {
        this.setState({redirect: true});
    }

    handleRedirect() {
        if (this.state.redirect) {
          return (
            <Redirect
              to={{
                pathname: "/my-events/" + this.state.id,
                state: { id: this.state.id }
              }}
            />
          );
        }
      }


    getRandomColour = () => {
        return this.colours[Math.floor(Math.random() * this.colours.length)];
    }

    render() {
        const color = this.getRandomColour();
        return (
            <Card style={{ height: '23vw', position:'relative'}}>
            {this.handleRedirect()}
            <CardActionArea onClick={() => this.handleEventClick()} >
                <div className="card_header" style={{background: color}}></div>
                <CardContent>
                    <Typography gutterBottom variant="body1" style={{fontFamily: "'Montserrat', sans-serif", fontWeight:'bold'}}>
                        {this.props.event}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{fontFamily: "'Montserrat', sans-serif", height: '2vw'}}>
                        {this.props.time}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{fontFamily: "'Montserrat', sans-serif"}}>
                        {this.props.place}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <CardAction
                    action={this.props.action}
                    eventID={this.props.id}
                    delete={this.props.delete}
                />
            </CardActions>
            </Card>
        );
    }
}