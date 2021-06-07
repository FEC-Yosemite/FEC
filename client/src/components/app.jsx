import React from 'react';
import Overview from './overview/Overview.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 19089,
    }
    this.setCurrentProductId = this.setCurrentProductId.bind(this);
  }

  setCurrentProductId(e) { // relatedItems will not need this functionality. If no one else needs this, we can get rid of it.
    console.log(`app: e.target: ${JSON.stringify(e.target)}`);
  }

  render() {
    return (
      <div id="app-div">
        <Overview productId={ this.state.currentProductId }/>
        <RelatedItems productId={ this.state.currentProductId } />
        <RatingsReviews productId={ this.state.currentProductId }/>
      </div>
    )
  }
}

export default App;
