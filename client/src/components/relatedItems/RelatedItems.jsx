import React, { Component } from 'react';

import RelatedProductsList from './RelatedProductsList.jsx';
import Comparison from './Comparison.jsx';

import { getRelatedProducts } from  '../../requests.js';
import { getProductById } from  '../../requests.js';

class RelatedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: { data: [] },
            finished: false
            // window_size: 3,
            // related_products:
        };
        this.refreshProductsList = this.refreshProductsList.bind(this);
        this.clickedProduct = this.clickedProduct.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    refreshProductsList() {
        getRelatedProducts(this.props.productId)
        .then(idsArray => {
            this.setState({
                productsList: idsArray,
                finished: true,
                show: false,
                modal_product: null,
                current_product: null
            });
            console.log(`state: ${this.state.productsList}`);
        });
    }

    showModal(product) {
        this.getCurrentProduct(product);
    }

    hideModal() {
        this.setState({ show: false });
    }

    clickedProduct(e) {
        // TODO? up in app?
    }

    getCurrentProduct(product) {
        getProductById(this.props.productId)
        .then(currentProduct => {
            this.setState ({
                current_product: currentProduct.data,
                show: true,
                modal_product: (product)
            });
        });
    }

    componentDidMount() {
        this.refreshProductsList();
        console.log(`state: ${this.state.productsList}`);
    }

    render() {
        return (
            <div id="related-items">
                {
                this.state.show ?
                <Comparison modal_product={JSON.stringify(this.state.modal_product)} current_product={JSON.stringify(this.state.current_product)} hideModal={this.hideModal} />
                :
                null
                }
                {
                this.state.finished ?
                <RelatedProductsList productId={this.props.productId} productsList={this.state.productsList} showModal={this.showModal} updateCurrentProduct={this.props.updateCurrentProduct} />
                :
                <h1>Loading</h1>
                }
            </div>
        );
    }
}

export default RelatedItems;