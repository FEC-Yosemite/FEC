import React, { Component } from 'react';
import { getProductById, getProductStyles } from  '../../requests.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

class RelatedProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            styles: null,
        };
        this.refreshProduct = this.refreshProduct.bind(this);
    }

    refreshProduct() {
        getProductById(this.props.productId)
        .then(product => {
            this.setState({
                product: product.data
            });
        });
        getProductStyles(this.props.productId)
        .then(styles => {
            this.setState({
                styles: styles.data.results
            });
        });
    }

    componentDidMount() {
        this.refreshProduct();
    }

    render() {
        return (
            <div id="carousel-item">
                {
                this.state.show ?
                <Comparison productId={this.props.productId} currentProductId={this.props.currentProductId} />
                :
                <div/>
                }
                {
                    this.state.styles === null || this.state.product === null ?
                    <h3>Loading...</h3>
                    :
                    <div id="product-card">
                        <FontAwesomeIcon id="modal-star" onClick={() => this.props.showModal(this.state.product)} icon={farStar} /> 
                        {/* showModal: .apply? I dont know, but I don't want to invoke it on assigning onClick */}
                        {
                        this.state.styles[0].photos[0].thumbnail_url !== null ?
                            <img src={this.state.styles[0].photos[0].thumbnail_url} onClick={this.props.updateCurrentProduct} key={this.props.key} />
                            :
                            <img src="https://nelowvision.com/wp-content/uploads/2018/11/Picture-Unavailable.jpg" onClick={this.props.updateCurrentProduct} key={this.props.key} />
                        }
                        <p>{this.state.product.category}</p>
                        <h4>{this.state.product.name}</h4>
                    </div>
                }
            </div>
        );
    }
}

export default RelatedProductCard;