import React from 'react';
import Overview from './overview/overview.jsx'
import ReviewsList from './ratingsReviews/ReviewsList.jsx';
import RelatedProductsList from './relatedItems/RelatedProductsList.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <div>
      Hello World!
      <Overview />
      <ReviewsList />
      <RelatedProductsList />
      Hello World! Test
      <RatingsReviews />
    </div>
    )
  }
}

export default App;