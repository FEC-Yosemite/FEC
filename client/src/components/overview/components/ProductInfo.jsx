import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faPinterestSquare } from '@fortawesome/free-brands-svg-icons';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: this.props.product,
      styles: this.props.styles,
      currentStyle: this.props.styles[0],
      ratings: this.props.ratings,
      avgRating: 0,
      reviewCount: this.props.reviewCount,
    };
  }

  componentDidMount() {
    this.setState({ avgRating: this.calcReviewAvg() })
  }

  renderStars() {
    return <><FontAwesomeIcon icon={farFaStar} /><FontAwesomeIcon icon={farFaStar} /><FontAwesomeIcon icon={farFaStar} /><FontAwesomeIcon icon={farFaStar} /><FontAwesomeIcon icon={farFaStar} /></>
  }

  calcReviewAvg() {
    const keys = Object.keys(this.state.ratings);
    if (keys.length === 0) return 'No reviews yet';
    let total = 0;
    let count = 0;
    keys.map((key) => {
      total += Number(key) * Number(this.state.ratings[key]);
      count += Number(this.state.ratings[key]);
    })
    let avg = (total / count).toFixed(1);
    return avg;
  }

  render() {
    return(
      <div id="product-info">
         { <p>Average rating: { this.state.avgRating }</p>}
         { <a href="#reviews" >See all { this.state.reviewCount } reviews</a>}
         { this.renderStars() }
        <p>{ this.state.product.category }</p>
        <h3>{ this.state.product.name }</h3>

        { this.state.currentStyle.sale_price ?
        <>
        <p className="original-price">{ this.state.currentStyle.original_price }</p>
        <p className="sale-price" >{ this.state.currentStyle.sale_price }</p>
        </> :
        <p className="regular-price">{ this.state.currentStyle.original_price }</p> }
        <a href="/" className="brand"><FontAwesomeIcon icon={faFacebookSquare} /></a>
        <a href="/" className="brand"><FontAwesomeIcon icon={faTwitterSquare} /></a>
        <a href="/" className="brand"><FontAwesomeIcon icon={faPinterestSquare} /></a>
      </div>
    )
  }
}

export default ProductInfo;
