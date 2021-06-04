import React from 'react';
import Overview from './overview/overview.jsx'
import RelatedProductsList from './relatedItems/RelatedProductsList.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 19089,
    }
  }

  render() {
    return (
      <div>
        <Overview productId={ this.state.currentProductId } />
        <RelatedItems productId={ this.state.currentProductId } />
        <RatingsReviews productId={ this.state.currentProductId }/>
      </div>
    )
  }
}

export default App;
