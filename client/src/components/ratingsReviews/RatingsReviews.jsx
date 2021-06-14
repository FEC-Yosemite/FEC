import React from 'react';
import ReviewsList from './components/ReviewsList.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import SortReviews from './components/SortReviews.jsx';
import WriteReview from './components/WriteReview.jsx';

import { getReviews, getReviewMeta } from '../../requests.js';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: {
        newest: [],
        helpful: [],
        relevant: []
      },
      sort: 'relevant',
      characteristics: {}
    }
    this.handleSort = this.handleSort.bind(this);
    this.reviewRequests = this.reviewRequests.bind(this);
  }

  handleSort(by) {
    this.setState({
      sort: by
    })
  }

  reviewRequests() {
    getReviews(this.props.productId, null, 100, 'newest')
      .then((res) => this.setState(prevState => ({
        reviews: {
          ...prevState.reviews,
          newest: res.data.results
        }
      })))
      .catch((err) => console.log('ERROR:', err));

    getReviews(this.props.productId, null, 100, 'helpful')
      .then((res) => this.setState(prevState => ({
        reviews: {
          ...prevState.reviews,
          helpful: res.data.results
        }
      })))
      .catch((err) => console.log('ERROR:', err));

    getReviews(this.props.productId, null, 100, 'relevant')
      .then((res) => this.setState(prevState => ({
        reviews: {
          ...prevState.reviews,
          relevant: res.data.results
        }
      })))
      .catch((err) => console.log('ERROR:', err));
  }

  componentDidMount() {
    this.reviewRequests();

    getReviewMeta(this.props.productId)
      .then(res => this.setState({
        characteristics: res.data.characteristics
      }))
      .catch(err => console.log('ERROR:', err))
  }

  render() {
    return (
      <div id='ratings-reviews'>
        <RatingBreakdown reviews={ this.state.reviews } productId={ this.props.productId }/>
        <ProductBreakdown reviews={ this.state.reviews } />
        <SortReviews reviews={ this.state.reviews } sort={ this.state.sort } handleSort={ this.handleSort }/>
        <ReviewsList reviews={ this.state.reviews } sort={ this.state.sort } requests={ this.reviewRequests } chars={ this.state.characteristics } productId={ this.props.productId } interact={ this.props.interact }/>
      </div>
    )
  }
}

export default RatingsReviews;