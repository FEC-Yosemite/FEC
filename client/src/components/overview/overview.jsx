import React from 'react';
import Gallery from './components/Gallery.jsx';
import ProductInfo from './components/ProductInfo.jsx';
import AddToCart from './components/AddToCart.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div id="overview">
        <Gallery />
        <ProductInfo />
        <AddToCart />
      </div>
    )
  }
}

export default Overview;