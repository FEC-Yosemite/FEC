import React from 'react';
import Review from './Review.jsx';
import WriteReview from './WriteReview.jsx';
import { getProductById } from '../../../requests.js';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedReviews: 2,
      product: '',
      write: false
    }

    this.handleMore = this.handleMore.bind(this);
    this.handleWrite = this.handleWrite.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  handleWrite() {
    this.setState({
      write: true
    })
  }

  handleClose() {
    this.setState({
      write: false
    })
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    getProductById(this.props.productId)
      .then(res => this.setState({
        product: res.data.name
      }));
  }

  render() {
    var reviewArray = []
    for (var i = 0; i < this.state.renderedReviews; i++) {
      reviewArray.push(
        <Review review={ this.props.reviews[this.props.sort][i] } />
      )
    }

    var remainingReviews = this.props.reviews[this.props.sort].length - this.state.renderedReviews;

    return this.props.reviews[this.props.sort].length > 0
    ? (
      <div id='reviews-list'>
        <p>-----Reviews List-----</p>
        { reviewArray.map((review) => {
          return review;
        }) }

        { remainingReviews > 0 ? <button id='more-reviews' onClick={ () => {this.handleMore(remainingReviews)} }>MORE REVIEWS</button> : null }
        <button id='write-review' onClick={ this.handleWrite }>ADD A REVIEW</button>
        <WriteReview show={ this.state.write } product={ this.state.product } close={ this.handleClose }/>
        <p>-----End Reviews List-----</p>
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