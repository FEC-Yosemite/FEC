import React from 'react';
import Overview from './overview/overview.jsx'
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 19091
    }
    this.setCurrentProductId = this.setCurrentProductId.bind(this);
  }

  setCurrentProductId(e) {
    // TO DO: event listener for click:
    // when product is clicked, read product_id and setState
  }

  render() {
    return (
    <div>
      <Overview productId={this.state.productId} />
      <RelatedItems productId={this.state.productId} />
      <RatingsReviews productId={this.state.productId} />
    </div>
    )
  }
}

export default App;