import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: this.props.product,
      styles: this.props.styles,
      currentStyle: this.props.styles[0],
      reviews: this.props.reviews,
      avgRating: 0,
    };
  }

  componentDidMount() {
    this.setState({ avgRating: this.calcReviewAvg() })
  }

  renderStars() {
    return <FontAwesomeIcon icon={fasFaStar} />
  }

  calcReviewAvg() {
    const keys = Object.keys(this.state.reviews.ratings);
    if (keys.length === 0) return 'No reviews yet';
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
         { <p>Average rating: { this.state.avgRating }</p>}
         { this.renderStars() }
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
