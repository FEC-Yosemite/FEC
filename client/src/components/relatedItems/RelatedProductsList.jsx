import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class RelatedProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            window: [],
            window_size: 3,
            related_products: this.props.productsList
        };
        this.refreshCarousel = this.refreshCarousel.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
        this.refreshCarousel()
    }

    refreshCarousel() {
        let products_window = [];
        
        for (let i = this.state.page; i < this.state.page + this.state.window_size; i++) {
            if (i < this.props.productsList.length) {
                products_window.push(this.props.productsList[i]);
            }
        }
        this.setState({
            window: JSON.parse(JSON.stringify(products_window))
        });
    }

    buttonClick(e) {
      e.preventDefault();
      let pageModifier = this.state.page;
      if (e.target.id === 'left-button') {
        this.setState({
          page: pageModifier - 1
        }, () => {
            this.refreshCarousel();
        });
      }
      if (e.target.id === 'right-button') {
          this.setState({
            page: pageModifier + 1
          }, () => {
            this.refreshCarousel();
        });
      }
    }

    render() {
        return (
            <div id="related-products-carousel">
            <div id="left-button-container">
                {
                this.state.page === 0 ?
                <div id="left-button-placeholder"> </div>
                :
                <FontAwesomeIcon id="left-button" onClick={this.buttonClick} icon={faArrowLeft} />
                }
            </div>
                {
                this.state.window.length > 0 ?
                this.state.window.map((productId, index) => (
                    <RelatedProductCard key={productId} productId={productId} currentProductId={this.props.productId} showModal={this.props.showModal} updateCurrentProduct={this.props.updateCurrentProduct}/>
                ))
                :
                
                <h3>Loading "Related Cards"...</h3>
                }
            <div id="right-button-container">
                {
                (this.state.window_size * this.state.page) + (this.state.window_size - 1) >= this.props.productsList.length ?
                <div id="right-button-placeholder"> </div>
                :
                <FontAwesomeIcon id="right-button" onClick={this.buttonClick} icon={faArrowRight} />
                }
            </div>
            </div>
        );
    }
}

export default RelatedProductsList;