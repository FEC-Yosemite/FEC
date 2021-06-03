import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';
import { getRelatedProducts } from  '../../requests.js';

class RelatedProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: [],
        };
        this.refreshProductsList = this.refreshProductsList.bind(this);
    }

    refreshProductsList() {
        getRelatedProducts(this.props.productId)
        .then(idsArray => {
            this.setState({
                productsList: idsArray
            });
        });
    }

    componentDidMount() {
        this.refreshProductsList();
    }

    render() {
        return (
            <div id="related-products-carousel">
                <h3>related products list goes here</h3>
                {
                    this.state.productsList.map((productId, index) => (
                        <RelatedProductCard productId={productId} key={index} />
                    ))
                }
            </div>
        );
    }
}

export default RelatedProductsList;