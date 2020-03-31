import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Review from './Review';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class ReviewList extends React.Component {
   constructor(props) {
      super(props);
        this.state = {
            eventid: null,
            reviews: null, 
            average: null,
        };
    }

    async componentDidMount() {
        let pathArr = window.location.pathname.split('/');
        const eventid = pathArr[2];
        try{
            const res = await axios.get("http://localhost:5000/api/review/" + eventid);
            const resAvg = await axios.get("http://localhost:5000/api/review/average/" + eventid);
            if (res && res.status == 200){
              const reviews = res.data;
              this.setState({ reviews: reviews });
            }
            if (resAvg && resAvg.status == 200){
                const average = resAvg.data[0].avg;
                this.setState( { average: average });
            }
          } catch (err){
            console.log('err: ' + err);
          }
    }
  
  render() {
  const { classes } = this.props;
  const reviews = this.state.reviews;
  const average = this.state.average;
  const averageTruncated = Number(average).toFixed(2);
  return (
    <Container className={classes.container}>
        <Typography variant="h6">Reviews</Typography> 
        <Typography variant="body1">Average Rating: {averageTruncated}</Typography> 
        <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
            {reviews?.map(review => 
                <Review rating={review.rating} comment={review.comment} dateposted={review.dateposted} />
            )}
        </GridList>
        </div>
    </Container>
  );
}
}

const useStyles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    title: {
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    container: {
        marginTop: "2em"
    }
  }

export default withStyles(useStyles)(ReviewList);