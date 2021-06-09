import React from 'react';

import { getProductById, getProductStyles } from '../../../requests.js';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: this.props.product,
      styles: this.props.styles,
      currentStyle: this.props.styles[0],
      reviews: this.props.reviews,
    };
  }

  componentDidMount() {

  }

  calcReviewAvg() {
    const keys = Object.keys(this.state.reviews.ratings);
    let total = 0;
    let count = 0;
    keys.map((key) => {
      total += Number(key) * Number(this.state.reviews.ratings[key]);
      count += Number(this.state.reviews.ratings[key]);
    })
    let avg = (total / count).toFixed(1);
    return avg;
  }

  render() {
    return(
      <div id="product-info">
         { this.props.reviews.ratings ? <p>Average rating: { this.calcReviewAvg() }</p> : <p>No reviews yet</p> }
        <p>{ this.state.product.category }</p>
        <h3>{ this.state.product.name }</h3>

        { this.state.currentStyle.sale_price ?
        <>
        <p className="original-price">{ this.state.currentStyle.original_price }</p>
        <p className="sale-price" >{ this.state.currentStyle.sale_price }</p>
        </> :
        <p className="regular-price">{ this.state.currentStyle.original_price }</p> }

      </div>
    )
  }
}

export default ProductInfo;
