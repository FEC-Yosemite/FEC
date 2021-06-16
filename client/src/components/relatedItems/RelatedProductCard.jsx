import React, { Component } from 'react';
import { getProductById, getProductStyles } from  '../../requests.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose as fasWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose as farWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

class RelatedProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            styles: null,
            star: farStar,
            star_state: false,
            type: null
        };
        this.refreshProduct = this.refreshProduct.bind(this);
        this.productClickHandler = this.productClickHandler.bind(this);
        this.starEnter = this.starEnter.bind(this);
        this.starLeave = this.starLeave.bind(this);
    }

    refreshProduct() {
        if (this.props.productId !== 0) {
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
    }
    
    productClickHandler(e) {
        if (this.props.productId === 0) {
            this.props.addCurrentToOutfits()
        } else {
            if (this.state.star_state) {
                if (this.state.type === 'related') {
                    this.props.showModal(this.state.product);
                } else {
                    this.props.removeFromOutfit(this.props.productId);
                }
            } else  {
                this.props.updateCurrentProduct(this.props.productId);
            }
        }
        this.props.interact(e.target.outerHTML);
    }

    starEnter() {
        this.setState({
            star: (this.state.type === 'related' ? fasStar : fasWindowClose),
            star_state: true
        });
    }

    starLeave() {
        this.setState({
            star: (this.state.type === 'related' ? farStar : farWindowClose),
            star_state: false
        });
    }

    componentDidMount() {
        this.setState({
            star: (this.props.className === "outfit-item-card" ? farWindowClose : farStar),
            type: (this.props.className === "outfit-item-card" ? 'outfit' : 'related')
        }, () => this.refreshProduct());
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
                    this.state.type === 'outfit' && this.props.productId === 0 ?
                    <div id="product-card">+</div>
                    :
                    this.state.styles === null || this.state.product === null ?
                    <h3>Loading...</h3>
                    :
                    <div id="product-card">
                        <FontAwesomeIcon id={this.state.type === "related" ? "modal-star" : "close-x"} icon={this.state.star} onMouseEnter={this.starEnter} onMouseLeave={this.starLeave} />

                        {
                        this.state.styles[0].photos[0].thumbnail_url !== null ?
                        <img id="product-preview" src={this.state.styles[0].photos[0].thumbnail_url} key={this.props.productId} />
                        :
                        <img id="product-preview" src="https://nelowvision.com/wp-content/uploads/2018/11/Picture-Unavailable.jpg" key={this.props.productId} />
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