import React from 'react';
import ReviewsList from './components/ReviewsList.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import SortReviews from './components/SortReviews.jsx';
import WriteReview from './components/WriteReview.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        This is the ratings and reviews component!
        <ReviewsList />
        <ProductBreakdown />
        <RatingBreakdown />
        <SortReviews />
        <WriteReview />
      </div>
    )
  }
}

export default RatingsReviews;