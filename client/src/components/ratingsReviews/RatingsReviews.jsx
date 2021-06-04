import React from 'react';
import ReviewsList from './components/ReviewsList.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import SortReviews from './components/SortReviews.jsx';
import WriteReview from './components/WriteReview.jsx';

import { getReviews } from '../../requests.js';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }

  componentDidMount() {
    getReviews(this.props.productId)
      .then((res) => this.setState({
        reviews: res.data.results
      }))
      .catch((err) => console.log('ERROR:', err));
  }

  render() {
    return (
      <div>
        This is the ratings and reviews component!
        <ReviewsList reviews={ this.state.reviews } />
        <ProductBreakdown reviews={ this.state.reviews } />
        <RatingBreakdown reviews={ this.state.reviews } />
        <SortReviews reviews={ this.state.reviews } />
        <WriteReview reviews={ this.state.reviews } />
      </div>
    )
  }
}

export default RatingsReviews;