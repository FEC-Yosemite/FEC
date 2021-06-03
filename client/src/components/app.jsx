import React from 'react';
import ReviewsList from './ratingsReviews/ReviewsList.jsx';
import RelatedProductsList from './relatedItems/RelatedProductsList.jsx';

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
      <ReviewsList />
      <RelatedProductsList />
    </div>
    )
  }
}

export default App;