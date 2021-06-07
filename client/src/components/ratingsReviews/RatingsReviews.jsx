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
      reviews: {
        newest: [],
        helpful: [],
        relevant: []
      },
      sort: 'relevant'
    }
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(by) {
    this.setState({
      sort: by
    })
  }

  componentDidMount() {
    getReviews(this.props.productId)
      .then((res) => this.setState({
        reviews: {
          ...this.state.reviews,
          newest: res.data.results
        }
      }))
      .catch((err) => console.log('ERROR:', err));

    getReviews(this.props.productId, null, null, 'helpful')
      .then((res) => this.setState({
        reviews: {
          ...this.state.reviews,
          helpful: res.data.results
        }
      }))
      .catch((err) => console.log('ERROR:', err));

    getReviews(this.props.productId, null, null, 'relevant')
      .then((res) => this.setState({
        reviews: {
          ...this.state.reviews,
          relevant: res.data.results
        }
      }))
      .catch((err) => console.log('ERROR:', err));
  }

  render() {
    return (
      <div id='ratings-reviews'>
        <p>=========This is the ratings and reviews component!=========</p>
        <SortReviews reviews={ this.state.reviews } sort={ this.state.sort }handleSort={ this.handleSort }/>
        <ReviewsList reviews={ this.state.reviews } sort={ this.state.sort }/>
        <ProductBreakdown reviews={ this.state.reviews } />
        <RatingBreakdown reviews={ this.state.reviews } />
        <WriteReview reviews={ this.state.reviews } />
        <p>=========End of ratings and reviews component=========</p>
      </div>
    )
  }
}

export default RatingsReviews;