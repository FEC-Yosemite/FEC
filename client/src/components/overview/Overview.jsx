import React from 'react';
import Gallery from './components/Gallery.jsx';
import ProductInfo from './components/ProductInfo.jsx';
import AddToCart from './components/AddToCart.jsx';

import { getProductStyles } from '../../requests.js';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: this.props.productId,
    };
  }

  render() {
    return(
      <div id="overview">
        <h4>site-wide announcement message! - sale / discount <strong>offer</strong> - <a href="blank">new product highlight</a></h4>
        <Gallery productId = { this.state.currentProduct } />
        <ProductInfo />
        <AddToCart />
      </div>
    )
  }
}

export default Overview;