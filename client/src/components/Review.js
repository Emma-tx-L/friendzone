import React from 'react';
import { ListItem, ListItemText } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import '../stylesheets/ReviewCard.css';
import Container from '@material-ui/core/Container';

function Review(props){
    const rating = props.rating;
    const comment = props.comment;
    const datePosted = props.dateposted;

    return(
        <React.Fragment>
        <Container style={{width: "300px"}}>
        <Card >
        <CardContent>
        <Rating name="read-only" value={rating} readOnly />
        <Typography variant="body1">
            {comment}
        </Typography>
        <Typography color="textSecondary">
            {datePosted}
        </Typography>
        </CardContent>
        </Card>
            
        </Container>

        </React.Fragment>
    )
}

export default Review;