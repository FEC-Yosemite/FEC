import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';
import { getRelatedProducts } from  '../../requests.js';

class RelatedProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: [],
        };
    }

    componentDidMount() {
        getRelatedProducts(this.props.product)
        let products = [`placeholder`] // TODO: result of GET request
        this.setState({
            productsList: products
        });
    }

    render() {
        return (
            <div id="related-products-carousel">
                <h3>related products list goes here</h3>
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