import React, { Component } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import { getRelatedProducts } from  '../../requests.js';

class RelatedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: {}
        };
        this.refreshProductsList = this.refreshProductsList.bind(this);
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

    componentDidMount() {
        this.refreshProductsList();
        console.log(`state: ${this.state.productsList}`);
    }

    render() {
        return (
            <div>
                <h3>relateditems goes here!</h3>
                <RelatedProductsList productId={this.props.productId} productsList={this.state.productsList} />
            </div>
        );
    }
}

export default RelatedItems;