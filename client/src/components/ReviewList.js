import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Review from './Review';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import { uuid } from 'uuidv4';
import moment from 'moment';

class ReviewList extends React.Component {
   constructor(props) {
      super(props);
        this.state = {
            eventid: null,
            reviews: null, 
            average: null,
            addReviewDialog: false,
            rating: null,
            review: '',
        };
        this.handleAddReview = this.handleAddReview.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleReviewChange(e) {
        this.setState({ review: e.target.value });
    }

    handleAddReview() {
        this.setState({ addReviewDialog : true });
    }

    handleClose() {
        this.setState({ addReviewDialog: false, rating: null });
    }

    async handleSubmit() {
        let id = uuid();
        let comment = this.state.review;
        let rating = this.state.rating;
        let dateposted = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
        let eventid = this.state.eventid;
        let reviewToPost = { id, comment, rating, dateposted, eventid };
        const res = await axios.post("http://localhost:5000/api/review/", reviewToPost);
        console.log('res: ' + JSON.stringify(res));
        window.location.reload(false);
    }

    async componentDidMount() {
        let pathArr = window.location.pathname.split('/');
        const eventid = pathArr[2];
        this.setState({ eventid: eventid });
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
        <Button onClick={this.handleAddReview}variant="contained" color="primary">Add Review</Button>

        <Dialog open={this.state.addReviewDialog} onClose={console.log()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review"
            fullWidth
            onChange={this.handleReviewChange}
          />
        <Rating
          name="simple-controlled"
          value={this.state.rating}
          onChange={(event, newValue) => {
            this.setState({ rating: newValue })
          }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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