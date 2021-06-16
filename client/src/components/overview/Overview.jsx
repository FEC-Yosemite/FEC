import React from 'react';
import Gallery from './components/Gallery.jsx';
import ProductInfo from './components/ProductInfo.jsx';
import StylePicker from './components/StylePicker.jsx';
import AddToCart from './components/AddToCart.jsx';
import ProductDescription from './components/ProductDescription.jsx';

import { getProductById, getProductStyles, getReviewMeta, getReviews, addToCart } from '../../requests.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      syncedProduct: false,
      styles: [],
      syncedStyles: false,
      currentStyle: 0,
      cart: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.setState({
        syncedProduct: false,
        syncedStyles: false,
        currentStyle: 0,
      })
      this.refreshProduct();
    }
  }

  refreshProduct() {
    getProductById(this.props.productId)
    .then((res) => this.setState({
      product: res.data,
      syncedProduct: true,
    }))
    .catch((err) => console.log('ERROR:', err));

  getProductStyles(this.props.productId)
    .then((res) => this.setState({
      styles: res.data.results,
      syncedStyles: true,
    }))
    .catch((err) => console.log('ERROR:', err));

  }

  componentDidMount() {
    this.refreshProduct();
  }

  handleClickTrack(e) {
    this.props.interact(e.target.outerHTML, 'overview-gallery');
  }

  handleStyleChange(e) {
    this.handleClickTrack(e);
    const index = Number(e.target.getAttribute('data-index'));
    this.setState({ currentStyle: index });
  }

  handleCartAdd(id) {
    console.log(id)
    addToCart({sku_id: id})
    .then((res) => console.log(res))
    .catch((err) => console.log('ERROR:', err));
  }

  render() {
    return(
      <div id="overview">
        <h4>site-wide announcement message! - sale / discount <strong>offer</strong> - <a href="blank">new product highlight</a></h4>
        <div id="container" className="collapsed">

          { this.state.syncedStyles ?
          <Gallery productId={ this.props.productId } styles={ this.state.styles } currentStyle={ this.state.currentStyle } interact={ this.handleClickTrack.bind(this) } /> : <FontAwesomeIcon className="spinner" icon={faSpinner} spin /> }

          <aside id="info-aside">

            { this.state.syncedStyles && this.state.syncedProduct ?
            <ProductInfo product={ this.state.product } styles={ this.state.styles } ratings={ this.props.ratings } currentStyle={ this.state.currentStyle } interact={ this.handleClickTrack.bind(this)  } /> : <FontAwesomeIcon className="spinner" icon={faSpinner} spin /> }

            { this.state.syncedStyles ? <StylePicker styles={ this.state.styles } changeStyle={ this.handleStyleChange.bind(this) } currentStyle={ this.state.currentStyle } /> : <FontAwesomeIcon className="spinner" icon={faSpinner} spin /> }

            { this.state.syncedStyles ? <AddToCart skus={ this.state.styles[this.state.currentStyle].skus } addToCart={ this.handleCartAdd.bind(this) } interact={ this.handleClickTrack.bind(this) } /> : <FontAwesomeIcon className="spinner" icon={faSpinner} spin /> }

          </aside>
        </div>
        <div id="product-description">

          { this.state.syncedProduct && <ProductDescription product={ this.state.product } /> }

        </div>
      </div>
    )
  }
}

export default Overview;