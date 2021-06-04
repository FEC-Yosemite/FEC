import { api } from '../../config.js';
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
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products',
    headers: {
      authorization: api
    },
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
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}`,
    headers: {
      authorization: api
    }
  }

  return axios(options);
}

export function getProductStyles(id) {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/styles`,
    headers: {
      authorization: api
    }
  }

  return axios(options);
}

export function getRelatedProducts(id) {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/related`,
    headers: {
      authorization: api
    }
  }

  return axios(options);
}

// Reviews Api

export function getReviews(id, page, count, sort) {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews`,
    headers: {
      authorization: api
    },
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
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta`,
    headers: {
      authorization: api
    },
    params: {
      product_id: id,
    }
  }

  return axios(options);
}

export function addReview(id, rate, sum, body, rec, name, email, photos, char) {
  var options = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews`,
    headers: {
      authorization: api
    },
    params: {
      product_id: id,
      rating: rate,
      summary: sum,
      body: body,
      recommend: rec,
      name: name,
      email: email,
      photos: photos,
      characteristics: char
    }
  }

  return axios(options);
}

export function markAsHelpful(reviewid) {
  var options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${reviewid}/helpful`,
    headers: {
      authorization: api
    }
  }

  return axios(options);
}

export function reportReview(reviewid) {
  var options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${reviewid}/report`,
    headers: {
      authorization: api
    }
  }

  return axios(options);
}

// Cart Api

export function getCart() {
  var options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart`,
    headers: {
      authorization: api
    }
  }

  return axios(options);
}

export function addToCart(id) {
  var options = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart`,
    headers: {
      authorization: api
    },
    params: {
      sku_id: id
    }
  }

  return axios(options);
}

