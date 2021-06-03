import React from 'react';
import Overview from './overview/overview.jsx'
import RelatedProductsList from './relatedItems/RelatedProductsList.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null
    }
    this.setCurrentProductId = this.setCurrentProductId.bind(this);
  }

  setCurrentProductId() {

  }

  render() {
    return (
      <div>
      Hello World!
      <Overview productId={this.state.productId} />
      <RelatedItems productId={this.state.productId} />
      <RatingsReviews productId={this.state.productId} />
    </div>
    )
  }
}

export default App;