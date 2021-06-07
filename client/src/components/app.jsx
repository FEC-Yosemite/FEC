import React from 'react';
import Overview from './overview/Overview.jsx'
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import { getProducts } from '../requests.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 19089,
    }
    this.setCurrentProductId = this.setCurrentProductId.bind(this);
  }

  setCurrentProductId(e) {
    // TO DO: event listener for click:
    // when product is clicked, read product_id and setState
  }

  componentDidMount() {
    getProducts()
      .then((data) => console.log('Products:', data))
      .catch((err) => console.log('ERROR:', err));
  }

  render() {
    return (
      <div id="app-div">
        <Overview productId={ this.state.currentProductId }/>
        <RelatedItems productId={ this.state.currentProductId }/>
        <RatingsReviews productId={ this.state.currentProductId }/>
      </div>
    )
  }
}

export default App;
