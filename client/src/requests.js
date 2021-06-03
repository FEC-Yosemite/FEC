import { api } from '../../config.js';
const axios = require('axios');

// Products Api

export function getProducts(page, count) {
  var options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products',
    headers: {
      authorization: api
    },
    page: page,
    count: count
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

