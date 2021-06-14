const { key } = require('./config.js');
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

const getProducts = (params) => {
  var options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products',
    headers: {
      authorization: key
    },
    params: params
  }

  return axios(options);
}

const getProductById = (id) => {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}`,
    headers: {
      authorization: key
    }
  }

  return axios(options);
}

const getProductStyles = (id) => {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/styles`,
    headers: {
      authorization: key
    }
  }

  return axios(options);
}

const getRelatedProducts = (id) => {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/related`,
    headers: {
      authorization: key
    }
  }

  return axios(options);
}

// Reviews Api

const getReviews = (params) => {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews`,
    headers: {
      authorization: key
    },
    params: params
  }

  return axios(options);
}

const getReviewMeta = (params) => {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta`,
    headers: {
      authorization: key
    },
    params: params
  }

  return axios(options);
}

const addReview = (data) => {
  var options = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews`,
    headers: {
      authorization: key
    },
    data: data
  }

  return axios(options);
}

const markAsHelpful = (reviewid) => {
  var options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${reviewid}/helpful`,
    headers: {
      authorization: key
    }
  }

  return axios(options);
}

const reportReview = (reviewid) => {
  var options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${reviewid}/report`,
    headers: {
      authorization: key
    }
  }

  return axios(options);
}

// Cart Api

const getCart = () => {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart`,
    headers: {
      authorization: key
    }
  }

  return axios(options);
}

// params must be an object

const addToCart = (data) => {
  var options = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart`,
    headers: {
      authorization: key
    },
    data: data
  }

  return axios(options);
}

// Interactions Api

const addInteraction = (data) => {
  var options = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/interactions`,
    headers: {
      authorization: key
    },
    data: data
  }

  return axios(options);
}

module.exports = {
  getProducts,
  getProductById,
  getProductStyles,
  getRelatedProducts,
  getReviews,
  getReviewMeta,
  addReview,
  markAsHelpful,
  reportReview,
  getCart,
  addToCart,
  addInteraction
}