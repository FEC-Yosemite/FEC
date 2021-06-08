import React from 'react';

import { getProductById } from '../../../requests.js';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    getProductById(this.props.productId)
    .then((res) => this.setState({
      product: res.data,
    }))
    .then(() => console.log("PRODUCT: ", this.state.product) )
    .catch((err) => console.log('ERROR:', err));
  }

  render() {
    return(
      <div id="product-info">Product Info</div>
    )
  }
}

export default ProductInfo;