import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import '../stylesheets/EventCard.css';

export default class MediaCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            id: props.id
        };
        this.events = []
        this.handleEventClick = this.handleEventClick.bind(this);
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

    render() {
        const { id } = this.props;
        return (
            <Card onClick={() => this.handleEventClick()} className={`eventcard-${this.props.key}`}>
            {this.handleRedirect()}
            <CardActionArea>
                <CardMedia
                className="eventcard-media"
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {this.props.event}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.time}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.place}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
            </Card>
        );
    }
}