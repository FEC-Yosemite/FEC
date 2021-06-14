import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            window: [],
            window_size: 2
        };
        this.refreshCarousel = this.refreshCarousel.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
        this.refreshCarousel()
    }

    refreshCarousel() {
        let products_window = [];
        for (let i = this.state.page * this.state.window_size; i <= this.state.window_size * this.state.page + 1; i++) {
            if (i < this.props.productsList.data.length) {
                console.log(`i: ${i}`);
                console.log(`Product IDs in carousel: ${this.props.productsList.data[i]}`);
                products_window.push(this.props.productsList.data[i]);
            }
        }
        this.setState({
            related_products: JSON.parse(JSON.stringify(products_window))
        });
        setTimeout(console.log(`WHOLE LIST OF PRODUCTS: ${this.state.related_products}`), 1);
    }

    buttonClick(e) {
      e.preventDefault();
      let pageModifier = this.state.page;
      if (e.target.id === 'left-button') {
        this.setState({
          page: pageModifier - 1
        });
        this.refreshCarousel();
      }
      if (e.target.id === 'right-button') {
          this.setState({
            page: pageModifier + 1
          });
          this.refreshCarousel();
      }
      console.log(`PAGE: ${this.state.page}`);
      console.log(`PAGE > LENGTH?: ${this.props.productsList.data.length}`);
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
                this.state.related_products.length > 0 ?
                this.state.related_products.map((productId, index) => (
                    <RelatedProductCard key={productId} productId={productId} currentProductId={this.props.productId} showModal={this.props.showModal} updateCurrentProduct={this.props.updateCurrentProduct}/>
                ))
                :
                <h3>Loading "Related Cards"...</h3>
            }
            <div id="right-button-container">
            {
                this.state.page + this.state.window_size + 1 >= this.props.productsList.data.length ?
                <div id="right-button-placeholder"> </div>
                :
                <FontAwesomeIcon id="right-button" onClick={this.buttonClick} icon={faArrowRight} />
            }
            </div>
            {/* <div></div> */}
            {/* <h1>BELOW IS WHOLE LIST</h1>
            <br/>
            {
                this.state.related_products.length > 0 ?
                this.state.related_products.map((productId, index) => (
                    <RelatedProductCard key={index} productId={productId} />
                ))
                :
                <h3>Loading "Related Cards"...</h3>
            } */}
            </div>
        );
    }
}

export default Carousel;