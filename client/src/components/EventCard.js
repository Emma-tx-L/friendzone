import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../stylesheets/EventCard.css';

export default class MediaCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.events = []
    }

    render() {
        return (
            <Card class="card" className={`eventcard-${this.props.key}`}>
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