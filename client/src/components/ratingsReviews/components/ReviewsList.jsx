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
      write: false,
      filterOn: false
    }

    this.handleMore = this.handleMore.bind(this);
    this.handleWrite = this.handleWrite.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.checkFilter = this.checkFilter.bind(this);
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

  checkFilter() {
    let on = false;

    for (let key in this.props.filter) {
      if (this.props.filter[key]) {
        on = true;
      }
    }

    this.setState({
      filterOn: on
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.checkFilter();
    }
  }

  componentDidMount() {
    this.checkFilter();
    getProductById(this.props.productId)
      .then(res => this.setState({
        product: res.data.name
      }));
  }

  render() {
    let reviewArray = [];
    let count = 0;

    if (this.props.reviews[this.props.sort].length > 0) {

      while (reviewArray.length < this.state.renderedReviews) {
        if (this.state.filterOn) {
          if (this.props.filter[this.props.reviews[this.props.sort][count].rating]) {
            reviewArray.push(
              this.props.reviews[this.props.sort][count]
            )
          }
          count++;
        } else {
          reviewArray.push(
            this.props.reviews[this.props.sort][count]
          )
          count++;
        }
      }
    }

    let remainingReviews = this.props.reviews[this.props.sort].length - this.state.renderedReviews;

    return this.props.reviews[this.props.sort].length > 0
    ? (
      <div id='reviews'>
        <div id='reviews-list'>
          { reviewArray.map((review) => {
            return <Review review={ review } interact={ this.props.interact } />
          }) }

        </div>
          { remainingReviews > 0 ? <button id='more-reviews' onClick={ () => {this.handleMore(remainingReviews)} }>MORE REVIEWS</button> : null }
          <button id='write-review' onClick={ this.handleWrite }>ADD A REVIEW</button>
          <WriteReview show={ this.state.write } requests={ this.props.requests } productId={ this.props.productId } chars={ this.props.chars } product={ this.state.product } close={ this.handleClose }/>
      </div>
    )
    : (
      <div id='reviews'>
        <div id='reviews-list'>
          <h2>loading...</h2>
        </div>
      </div>
    )
  }
}

export default ReviewsList;