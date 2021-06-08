import React from 'react';

import { getProductById, getProductStyles } from '../../../requests.js';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: this.props.product,
      styles: this.props.styles,
    };
  }

  render() {
    return(
      <div id="product-info">
        <p>star rating</p>
        <p>{ this.state.product.category }</p>
        <h3>{ this.state.product.name }</h3>
        <p>price</p>
      </div>
    )
  }
}

export default ProductInfo;