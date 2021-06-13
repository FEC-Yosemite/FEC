import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faPinterestSquare } from '@fortawesome/free-brands-svg-icons';

import quarterStar from '../../../../pix/svgs/starquarter.svg';
import threeQuarterStar from '../../../../pix/svgs/star3quarters.svg';
import star from '../../../../pix/svgs/star.svg';
import starEmpty from '../../../../pix/svgs/star-o.svg';
import starHalf from '../../../../pix/svgs/star-half-empty.svg';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: this.props.product,
      styles: this.props.styles,
      currentStyle: this.props.currentStyle,
      ratings: this.props.ratings,
      avg: 0,
      reviewCount: this.props.reviewCount,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStyle !== prevProps.currentStyle) {
      this.setState({
        currentStyle: this.props.currentStyle,
      })
    }
  }

  componentDidMount() {
    this.setState({ avg: this.getAvgRating() })
  }

  renderStars() {
    let stars = [];
    let avg = this.state.avg;
    let whole = Math.floor(avg);
    let float = avg % 1;

    while (stars.length < whole) {
      stars.push(<img src={ star }/>)
    }

    if (float > 0 && float <= 0.33) {
      stars.push(<img src={ quarterStar }/>)
    } else if (float > 0.33 && float <= 0.67) {
      stars.push(<img src={ starHalf }/>)
    } else if (float > 0.67 && float < 1) {
      stars.push(<img src={ threeQuarterStar }/>)
    }

    while (stars.length < 5) {
      stars.push(<img src={ starEmpty }/>)
    }


    return stars;
  }

  getAvgRating() {
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
         { <p>Average rating: { this.state.avg }</p>}
         { (this.state.reviewCount !== 0) && <a href="#reviews" >See all { this.state.reviewCount } reviews</a>}
         { this.renderStars() }
        <p>{ this.state.product.category }</p>
        <h3>{ this.state.product.name }</h3>

        { this.state.styles[this.state.currentStyle].sale_price ?
        <>
        <p className="original-price">{ this.state.styles[this.state.currentStyle].original_price }</p>
        <p className="sale-price" >{ this.state.styles[this.state.currentStyle].sale_price }</p>
        </> :
        <p className="regular-price">{ this.state.styles[this.state.currentStyle].original_price }</p> }
        <a href="/" className="brand"><FontAwesomeIcon icon={faFacebookSquare} /></a>
        <a href="/" className="brand"><FontAwesomeIcon icon={faTwitterSquare} /></a>
        <a href="/" className="brand"><FontAwesomeIcon icon={faPinterestSquare} /></a>
        <p><strong>Style ></strong>{ this.state.styles[this.state.currentStyle].name }</p>
      </div>
    )
  }
}

export default ProductInfo;
