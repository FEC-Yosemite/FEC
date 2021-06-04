import React from 'react';
import Gallery from './components/Gallery.jsx';
import ProductInfo from './components/ProductInfo.jsx';
import AddToCart from './components/AddToCart.jsx';

import { getProductStyles } from '../../requests.js';

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styles: [],
    }
  }

  componentDidMount() {
    getProductStyles(this.props.productId)
      .then((res) => this.setState({
        styles: res.data.results
      }))
      .catch((err) => console.log('ERROR:', err));
  }

  render() {
    return(
      <div id="overview">
        <h4>site-wide announcement message! - sale / discount <strong>offer</strong> - <a href="blank">new product highlight</a></h4>
        <Gallery currentStyles = { this.state.styles } />
        <ProductInfo />
        <AddToCart />
      </div>
    )
  }
}

export default Overview;