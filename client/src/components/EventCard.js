import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import { borders } from '@material-ui/system';
import '../stylesheets/EventCard.css';

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
            '#795dd4'
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
            <Card onClick={() => this.handleEventClick()} style={{height: '23vw', position:'relative'}}>
            {this.handleRedirect()}
            <CardActionArea>
                <div className="card_header" style={{background: color}}></div>
                <CardContent>
                    <Typography gutterBottom variant="body1" style={{fontWeight:'bold'}}>
                        {this.props.event}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{height: '2vw'}}>
                        {this.props.time}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.place}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" className="card_action" 
                style={{position:'absolute', bottom: '1vw', right: '1vw', }}>
                    EDIT
                </Button>
            </CardActions>
            </Card>
        );
    }
}