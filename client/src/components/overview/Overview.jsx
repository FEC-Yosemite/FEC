import React from 'react';
import Gallery from './components/Gallery.jsx';
import ProductInfo from './components/ProductInfo.jsx';
import StylePicker from './components/StylePicker.jsx';
import AddToCart from './components/AddToCart.jsx';

import { getProductById, getProductStyles, getReviewMeta, getReviews } from '../../requests.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: this.props.productId,
      product: {},
      syncedProduct: false,
      styles: [],
      syncedStyles: false,
      ratings: {},
      syncedRatings: false,
      reviewCount: 0,
      syncedReviewCount: false,
    };
  }

  componentDidMount() {
    getProductById(this.state.currentProduct)
      .then((res) => this.setState({
        product: res.data,
        syncedProduct: true,
      }))
      .catch((err) => console.log('ERROR:', err));

    getProductStyles(this.state.currentProduct)
      .then((res) => this.setState({
        styles: res.data.results,
        syncedStyles: true,
      }))
      .catch((err) => console.log('ERROR:', err));

    getReviewMeta(this.state.currentProduct)
      .then((res) => this.setState({
        ratings: res.data.ratings,
        syncedRatings: true,
      }))

    getReviews(this.state.currentProduct)
      .then((res) => this.setState({
        reviewCount: res.data.count,
        syncedReviewCount: true,
      }))


  }

  render() {
    return(
      <div id="overview">
        <h4>site-wide announcement message! - sale / discount <strong>offer</strong> - <a href="blank">new product highlight</a></h4>
        <div id="container" className="collapsed">
          { this.state.syncedStyles ?
          <Gallery productId={ this.state.currentProduct } styles={ this.state.styles } /> : <FontAwesomeIcon className="spinner" icon={faSpinner} spin />}

          <aside id="info-aside">
            {this.state.syncedStyles && this.state.syncedProduct && this.state.syncedRatings && this.state.syncedReviewCount ?
            <ProductInfo product={ this.state.product } styles={ this.state.styles } ratings={ this.state.ratings } reviewCount={ this.state.reviewCount } /> : <FontAwesomeIcon className="spinner" icon={faSpinner} spin />}
            <StylePicker />
            <AddToCart />
          </aside>
        </div>
      </div>
    )
  }
}

export default Overview;