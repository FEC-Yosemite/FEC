import React from 'react';
import Overview from './overview/overview.jsx'
import RelatedProductsList from './relatedItems/RelatedProductsList.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

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
      <RelatedItems />
      Hello World! Test
      <RelatedProductsList />
      <RatingsReviews />
    </div>
    )
  }
}

export default App;