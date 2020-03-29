import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import '../stylesheets/EventCard.css';

/**
 * Props:
*      { type }    activity type/category name
*      { image }   category image 
 */
export default class CategoryCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            type: props.type
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
                pathname: "/categories/" + this.state.type,
                state: { type: this.state.type }
              }}
            />
          );
        }
      }

    render() {
        return (
            <Card onClick={() => this.handleEventClick()} className={`eventcard-${this.props.id}`}>
            {this.handleRedirect()}
            <CardActionArea>
                <CardMedia
                className="category-media"
                title={this.props.type}
                style={{height: 10, paddingTop: '56.25%'}}
                >
                    <img src={this.props.img}/>
                </CardMedia>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {this.props.type}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        );
    }
}