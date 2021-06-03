import React from 'react';
import Gallery from './gallery.jsx';
import ProductInfo from './productInfo.jsx';
import AddToCart from './addToCart.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <>
      <h3>Overview</h3>
      <Gallery />
      <ProductInfo />
      <AddToCart />
      </>
    )
  }
}

export default Overview;