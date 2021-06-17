import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            window: [],
            window_size: 3
        };
        this.refreshCarousel = this.refreshCarousel.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    refreshCarousel() {
        let products_window = [];
        
        for (let i = this.state.page; i < this.state.page + this.state.window_size; i++) {
            if (i < this.props.outfits_list.length) {
                products_window.push(this.props.outfits_list[i]);
            }
        }
        this.setState({
            window: JSON.parse(JSON.stringify(products_window))
        });
    }

    buttonClick(e) {
      e.preventDefault();
      this.props.interact(e.target.outerHTML);
      let pageModifier = this.state.page;
      if (e.currentTarget.id === 'left-button') {
        this.setState({
          page: pageModifier - 1
        }, () => {
            this.refreshCarousel();
        });
      }
      if (e.currentTarget.id === 'right-button') {
          this.setState({
            page: pageModifier + 1
          }, () => {
            this.refreshCarousel();
        });
      }
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.outfits_list) !== JSON.stringify(this.props.outfits_list)) {
            this.refreshCarousel();
        }
      }

    componentDidMount() {
        this.refreshCarousel();
    }

    render() {
        return (
            <div id="carousel">
            <div id="left-button-container">
                {
                this.state.page === 0 ?
                <div id="left-button-placeholder"> </div>
                :
                <FontAwesomeIcon id="left-button" onClick={this.buttonClick} icon={faChevronLeft} />
                }
            </div>
                {
                this.state.window.length > 0 ?
                this.state.window.map((productId, index) => (
                    <RelatedProductCard className="outfit-item-card" key={"outfit-" + productId} productId={productId} currentProductId={this.props.productId} updateCurrentProduct={this.props.updateCurrentProduct} interact={this.props.interact} removeFromOutfit={this.props.removeFromOutfit} addCurrentToOutfits={this.props.addCurrentToOutfits} toTop={this.props.toTop} />
                ))
                :
                
                <h3>Loading "Related Cards"...</h3>
                }
            <div id="right-button-container">
                {
                (this.state.window_size * this.state.page) + (this.state.window_size) >= this.props.outfits_list.length ?
                <div id="right-button-placeholder"> </div>
                :
                <FontAwesomeIcon id="right-button" onClick={this.buttonClick} icon={faChevronRight} />
                }
            </div>
            </div>
        );
    }
}

export default Carousel;