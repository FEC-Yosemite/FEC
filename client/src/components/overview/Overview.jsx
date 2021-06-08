import React from 'react';
import Gallery from './components/Gallery.jsx';
import ProductInfo from './components/ProductInfo.jsx';
import AddToCart from './components/AddToCart.jsx';

import { getProductById, getProductStyles } from '../../requests.js';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: this.props.productId,
      product: {},
      styles: [],
      synced: false,
    };
  }

  componentDidMount() {
    getProductById(this.state.currentProduct)
    .then((res) => this.setState({
      product: res.data,
    }))
    .then(() => console.log("PRODUCT: ", this.state.product) )
    .catch((err) => console.log('ERROR:', err));

    getProductStyles(this.state.currentProduct)
      .then((res) => this.setState({
        styles: res.data.results,
        synced: true,
      }))
  }

  render() {
    return(
      <div id="overview">
        <h4>site-wide announcement message! - sale / discount <strong>offer</strong> - <a href="blank">new product highlight</a></h4>
        <div id="container" className="collapsed">
          { this.state.synced === true && <Gallery productId = { this.state.currentProduct } styles = { this.state.styles } />}

          <aside id="info-aside">
            <ProductInfo productId = { this.state.currentProduct } />
            <AddToCart />
          </aside>
        </div>
      </div>
    )
  }
}

export default Overview;