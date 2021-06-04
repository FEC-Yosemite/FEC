import React, { Component } from 'react';
import { getProductById, getProductStyles } from  '../../requests.js';

class RelatedProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: null,
            // name: null,
            // slogan: null,
            // description: null,
            // category: null,
            // defaultPrice: null,
            // features: {},
            // styles: {}
            product: null,
            styles: null,
        };
        this.refreshProduct = this.refreshProduct.bind(this);
    }

    refreshProduct() {
        getProductById(this.props.productId)
        .then(product => {
            this.setState({
                // id: product.id,
                // name: product.name,
                // slogan: product.slogan,
                // description: product.description,
                // category: product.category,
                // defaultPrice: product.defaultPrice,
                // features: product.features
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
            <li id="carousel-item">
                {
                    this.state.styles === null || this.state.product === null ?
                    <h3>Loading...</h3>
                    :
                    <span id="product-card">
                        {/* <h1>Item no. {JSON.stringify(this.state.product.productId)}</h1> */}
                        {
                        this.state.styles[0].photos[0].thumbnail_url !== null ?
                            <img src={this.state.styles[0].photos[0].thumbnail_url}/>
                            :
                            <img src="https://nelowvision.com/wp-content/uploads/2018/11/Picture-Unavailable.jpg"/>
                        }
                        <p>{this.state.product.category}</p>
                        <h4>{this.state.product.name}</h4>
                    </span>
                    // <li>clothing item</li>
                    /* <li>Clothing <img src={this.state.styles.results[0].photos[0].url} /></li> */
                }
            </li>
        );
    }
}

export default RelatedProductCard;