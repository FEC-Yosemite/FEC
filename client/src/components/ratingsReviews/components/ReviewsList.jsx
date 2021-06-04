import React from 'react';
import Review from './Review.jsx';
import {  } from '../../../requests.js';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedReviews: 2,
    }

    this.handleMore = this.handleMore.bind(this);
  }

  handleMore(rem) {
    if (rem === 1) {
      this.setState({
        renderedReviews: this.state.renderedReviews + 1
      })
    } else {
      this.setState({
        renderedReviews: this.state.renderedReviews + 2
      })
    }
  }

  componentDidMount() {
    console.log(this.props.reviews)
  }

  render() {
    var reviewArray = []
    for (var i = 0; i < this.state.renderedReviews; i++) {
      reviewArray.push(
        <Review review={ this.props.reviews[i] } />
      )
    }

    var remainingReviews = this.props.reviews.length - this.state.renderedReviews;

    return this.props.reviews.length > 0
    ? (
      <div id='reviews-list'>
        Reviews List
        { reviewArray.map((review) => {
          return review;
        }) }

        { remainingReviews > 0 ? <button id='more-reviews' onClick={ () => {this.handleMore(remainingReviews)} }>More Reviews</button> : null }
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