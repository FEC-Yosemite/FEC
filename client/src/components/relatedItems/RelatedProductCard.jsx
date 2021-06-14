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
            star: farStar,
            star_state: false
        };
        this.refreshProduct = this.refreshProduct.bind(this);
        this.productClickHandler = this.productClickHandler.bind(this);
        this.starEnter = this.starEnter.bind(this);
        this.starLeave = this.starLeave.bind(this);
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
    
    productClickHandler(e) {
        if (this.state.star_state) {
            this.props.showModal(this.state.product);
            this.props.interact(e.target.outerHTML);
        } else {
            this.props.updateCurrentProduct(this.props.productId);
            this.props.interact(e.target.outerHTML);
        }
    }

    starEnter() {
        this.setState({
            star: fasStar,
            star_state: true
        });
    }

    starLeave() {
        this.setState({
            star: farStar,
            star_state: false
        });
    }

    componentDidMount() {
        this.refreshProduct();
    }

    componentDidUpdate(prevProps) {
        if (this.props.product !== prevProps.product) {
            this.fetchData(this.props.userID);
        }
    }

    render() {
        return (
            <div id="carousel-item" onClick={(e) => this.productClickHandler(e)} >
                {
                    this.state.styles === null || this.state.product === null ?
                    <h3>Loading...</h3>
                    :
                    <div id="product-card">
                        <FontAwesomeIcon id="modal-star" icon={this.state.star} onMouseEnter={this.starEnter} onMouseLeave={this.starLeave} />

                        {
                        this.state.styles[0].photos[0].thumbnail_url !== null ?
                        <img src={this.state.styles[0].photos[0].thumbnail_url} key={this.props.productId} />
                        :
                        <img src="https://nelowvision.com/wp-content/uploads/2018/11/Picture-Unavailable.jpg" key={this.props.productId} />
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