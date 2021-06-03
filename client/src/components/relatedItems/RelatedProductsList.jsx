import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

class RelatedProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: [],
        };
    }

    componentDidMount() {
        // TODO: use function from requests.js
        let products = [`placeholder`] // TODO: result of GET request
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