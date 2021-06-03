import { api } from '../../config.js';
const axios = require('axios');

function getProducts(page, count) {
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

function getRelatedProducts(productId) {
  var options = {
    method: 'get',
    url: `/https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productId}}/related`,
    headers: {
      authorization: api
    }
  }
  return axios(options);
}