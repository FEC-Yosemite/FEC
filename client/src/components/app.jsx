import React from 'react';
import Overview from './overview/Overview.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import { getProducts, getProductById } from '../requests.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 19094,
    }
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
  }

  updateCurrentProduct(e) {
    this.setState({
      currentProductId: e
    }, () => {
    getProducts()
      .then(data => console.log('Products:', data))
      .catch(err => console.log('ERROR:', err));
    getProductById(this.state.currentProductId)
      .then(data => console.log('Current Product:', data))
      .catch(err => console.log('ERROR:', err));
    });
    console.log(e);
  }

  componentDidMount() {
    getProducts()
      .then(data => console.log('Products:', data))
      .catch(err => console.log('ERROR:', err));
    getProductById(this.state.currentProductId)
      .then(data => console.log('Current Product:', data))
      .catch(err => console.log('ERROR:', err));
  }

  render() {
    return (
      <div id="app-div">
        <Overview productId={ this.state.currentProductId }/>
        <RelatedItems productId={ this.state.currentProductId } updateCurrentProduct={this.updateCurrentProduct} />
        <RatingsReviews productId={ this.state.currentProductId }/>
      </div>
    )
  }
}

export default App;
