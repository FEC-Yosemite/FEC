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
      <h4>site-wide announcement message! - sale / discount <strong>offer</strong> - <a href="blank">new product highlight</a></h4>
      <Gallery />
      <ProductInfo />
      <AddToCart />
      </>
    )
  }
}

export default Overview;