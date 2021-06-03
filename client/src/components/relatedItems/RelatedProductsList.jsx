import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';
import axios from 'axios';

class RelatedProductsList extends Component {
    constructor({ productId }) {
        super(props);
        this.state = {
            productsList: [],
        };
        

    }

    componentDidMount() {
        axios.get(`/https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productId}}/related`, {
            params: {
                Authorization: API_KEY
            }
        })
        let products = []; // TODO: result of GET request
        this.setState({
            productsList: products
        });
    }

    render() {
        return (
            <div id="related-products-carousel">
                {
                    this.state.productsList.map((product, index) => (
                        <RelatedProductCard product={product} key={index} />
                    ))
                }
            </div>
        );
    }
}

export default RelatedProductsList;