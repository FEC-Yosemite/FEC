import React, { Component } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import { getRelatedProducts } from  '../../requests.js';

class RelatedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: { data: [] }
            // window_size: 3,
            // related_products: 
        };
        this.refreshProductsList = this.refreshProductsList.bind(this);
        this.clickedProduct = this.clickedProduct.bind(this);
    }

    refreshProductsList() {
        getRelatedProducts(this.props.productId)
        .then(idsArray => {
            this.setState({
                productsList: idsArray
            });
            console.log(`state: ${this.state.productsList}`);
        });
    }

    clickedProduct(e) {

    }

    componentDidMount() {
        this.refreshProductsList();
        console.log(`state: ${this.state.productsList}`);
    }

    render() {
        return (
            <div id="related-items">
                <h3>relateditems goes here!</h3>
                <RelatedProductsList productId={this.props.productId} productsList={this.state.productsList} />
            </div>
        );
    }
}

export default RelatedItems;