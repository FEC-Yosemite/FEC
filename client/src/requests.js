const axios = require('axios');

/*

Deconstruct function names that you need to use for that component:

import { getProducts, getProductById, getProductStyles, getRelatedProducts } from '../../../requests.js';

All functions return a promise:

    getProducts()
      .then((data) => {
        console.log('getProducts:', data)
      });

*/

// Products Api

export function getProducts(page, count) {
  var options = {
    method: 'get',
    url: 'http://localhost:3000/products',
    params: {
      page: page,
      count: count
    }
  }

  return axios(options);
}

export function getProductById(id) {
  var options = {
    method: 'get',
    url: `http://localhost:3000/products/${id}`,
  }

  return axios(options);
}

export function getProductStyles(id) {
  var options = {
    method: 'get',
    url: `http://localhost:3000/products/${id}/styles`,
  }

  return axios(options);
}

export function getRelatedProducts(id) {
  var options = {
    method: 'get',
    url: `http://localhost:3000/products/${id}/related`,
  }

  return axios(options);
}

// Reviews Api

export function getReviews(id, page, count, sort) {
  var options = {
    method: 'get',
    url: `http://localhost:3000/reviews`,
    params: {
      product_id: id,
      page: page,
      count: count,
      sort: sort || 'newest'
    }
  }

  return axios(options);
}

export function getReviewMeta(id) {
  var options = {
    method: 'get',
    url: `http://localhost:3000/reviews/meta`,
    params: {
      product_id: id,
    }
  }

  return axios(options);
}

// addReview must pass in an object

export function addReview(data) {
  var options = {
    method: 'post',
    url: `http://localhost:3000/reviews`,
    data: data
  }

  return axios(options);
}

export function markAsHelpful(reviewid) {
  var options = {
    method: 'put',
    url: `http://localhost:3000/reviews/${reviewid}/helpful`,
  }

  return axios(options);
}

export function reportReview(reviewid) {
  var options = {
    method: 'put',
    url: `http://localhost:3000/reviews/${reviewid}/report`,
  }

  return axios(options);
}

// Cart Api

export function getCart() {
  var options = {
    method: 'get',
    url: `http://localhost:3000/cart`,
  }

  return axios(options);
}

// must pass in an object

export function addToCart(id) {
  var options = {
    method: 'post',
    url: `http://localhost:3000/cart`,
    params: {
      sku_id: id
    }
  }

  return axios(options);
}

// interactions

export function addInteraction(data) {
  var options = {
    method: 'post',
    url: 'http://localhost:3000/interactions',
    data: data
  }

  return axios(options);
}