import React from 'react';
import Review from './Review.jsx';
import {  } from '../../../requests.js';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedReviews: 2,
      remainingReviews: this.props.reviews.length
    }
  }

  componentDidMount() {
    console.log(this.props.reviews)
    this.setState({
      remainingReviews: this.props.reviews.length - this.state.renderedReviews
    })
  }

  render() {
    var reviewArray = []
    for (var i = 0; i < this.state.renderedReviews; i++) {
      reviewArray.push(
        <Review review={ this.props.reviews[i] } />
      )
    }

    return this.props.reviews.length > 0
    ? (
      <div id='reviews-list'>
        Reviews List
        { reviewArray.map((review) => {
          return review;
        }) }
      </div>
    )
    : (
      <div>
        loading...
      </div>
    )
  }
}

export default ReviewsList;