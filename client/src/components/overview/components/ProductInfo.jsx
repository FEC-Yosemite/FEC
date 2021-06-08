import React from 'react';

import { getProductById, getProductStyles } from '../../../requests.js';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      styles: [],
    };
  }

  componentDidMount() {
    getProductById(this.props.productId)
    .then((res) => this.setState({
      product: res.data,
    }))
    .then(() => console.log("PRODUCT: ", this.state.product) )
    .catch((err) => console.log('ERROR:', err));

    getProductStyles(this.props.productId)
      .then((res) => this.setState({
        styles: res.data.results,
      }))
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