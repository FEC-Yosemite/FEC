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
      total: 0,
      characteristics: {},
      filter: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      }
    }
    this.handleSort = this.handleSort.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.reviewRequests = this.reviewRequests.bind(this);
  }

  handleFilter(val) {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        [val]: !prevState.filter[val]
      }
    }))
  }

  getTotal() {
    let ratings = this.props.meta.ratings;
    let result = 0;
    for (let key in ratings) {
      result += Number(ratings[key])
    }

    this.setState({
      total: result
    })
  }

  handleClear() {
    this.setState({
      filter: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      }
    })
  }

  handleSort(by) {
    this.setState({
      sort: by
    })
  }

  reviewRequests() {
    if (this.state.sort === 'newest') {
      getReviews(this.props.productId, null, 100, 'newest')
        .then((res) => this.setState(prevState => ({
          reviews: {
            ...prevState.reviews,
            newest: res.data.results
          }
        })))
        .catch((err) => console.log('ERROR:', err));
    } else if (this.state.sort === 'helpful') {
      getReviews(this.props.productId, null, 100, 'helpful')
        .then((res) => this.setState(prevState => ({
          reviews: {
            ...prevState.reviews,
            helpful: res.data.results
          }
        })))
        .catch((err) => console.log('ERROR:', err));
    } else if (this.state.sort ==='relevant') {
      getReviews(this.props.productId, null, 100, 'relevant')
        .then((res) => this.setState(prevState => ({
          reviews: {
            ...prevState.reviews,
            relevant: res.data.results
          }
        })))
        .catch((err) => console.log('ERROR:', err));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sort !== prevState.sort || this.props.productId !== prevProps.productId) {
      this.reviewRequests();
    }
    if (this.props !== prevProps) {
      this.getTotal();
    }
  }

  componentDidMount() {
    this.reviewRequests();
    this.getTotal();
  }

  render() {
    return (
      <div id='ratings-reviews'>
        <RatingBreakdown reviews={ this.state.reviews } handleFilter={ this.handleFilter }productId={ this.props.productId } meta={ this.props.meta }/>
        <ProductBreakdown reviews={ this.state.reviews } chars={ this.props.meta.characteristics }/>
        <SortReviews role='review-sort' total={ this.state.total } sort={ this.state.sort } handleSort={ this.handleSort }/>
        <ReviewsList reviews={ this.state.reviews } sort={ this.state.sort } requests={ this.reviewRequests } chars={ this.props.meta.characteristics } productId={ this.props.productId } interact={ this.props.interact } filter={ this.state.filter } clear={ this.handleClear }/>
      </div>
    )
  }
}

export default RatingsReviews;