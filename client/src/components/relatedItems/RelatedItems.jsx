import React, { Component } from 'react';

import RelatedProductsList from './RelatedProductsList.jsx';
import Comparison from './Comparison.jsx';
import Carousel from './Carousel.jsx';

import { getRelatedProducts } from  '../../requests.js';
import { getProductById } from  '../../requests.js';

class RelatedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: [],
            finished: false
        };
        this.refreshProductsList = this.refreshProductsList.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    refreshProductsList() {
        getRelatedProducts(this.props.productId)
        .then(idsArray => {
            let ids = [...new Set(idsArray.data)];
            this.setState({
                productsList: ids,
                finished: false,
                show: false,
                modal_product: null,
                current_product: null
            }, () => {
                this.setState({
                    finished: true
                });
            });
            console.log(`idsArray.data: ${idsArray.data}`);
        });
    }

    showModal(product) {
        this.getCurrentProduct(product);
    }

    hideModal() {
        this.setState({ show: false });
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

    componentDidUpdate(prevProps) {
        if (prevProps.productId !== this.props.productId) {
            this.refreshProductsList();
        }
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
                // <Carousel productId={this.props.productId} productsList={this.state.productsList} showModal={this.showModal} updateCurrentProduct={this.props.updateCurrentProduct} />
                :
                <h1>Loading</h1>
                }
            </div>
        );
    }
}

export default RelatedItems;