import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

class RelatedProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="related-products-carousel">
                <h3>related products list goes here: {JSON.stringify(this.props.productsList.data)}</h3>
                <ul>
                {
                    Object.keys(this.props.productsList).length > 0 ?
                    this.props.productsList.data.map((productId, index) => (
                        <RelatedProductCard key={index} productId={productId} />
                    ))
                    :
                    <h3>Loading "Related Cards"...</h3>
                }
                </ul>
            </div>
        );
    }
}

export default RelatedProductsList;