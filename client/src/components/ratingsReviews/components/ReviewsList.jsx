import React from 'react';
import { getProducts, getProductById, getProductStyles, getRelatedProducts } from '../../../requests.js';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    getProducts()
      .then((data) => {
        console.log('getProducts:', data)
      });
    getProductById(19089)
      .then((data) => {
        console.log('getProductById:', data)
      });
    getProductStyles(19089)
      .then((data) => {
        console.log('getProductStyles:', data)
      });
    getRelatedProducts(19089)
      .then((data) => {
        console.log('getRelatedProducts:', data)
      });
  }

  render() {
    return (
      <div id='reviews-list'>Reviews List</div>
    )
  }
}

export default ReviewsList;