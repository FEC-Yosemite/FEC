import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

class RelatedProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            window: [],
            window_size: 2, //changing this will offer valuable insight into debugging later
            left_arrow: false,
            right_arrow: false,
            related_products: this.props.productsList.data
        };
        this.refreshCarousel = this.refreshCarousel.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
        this.refreshCarousel()
        this.setState({ state: this.state });
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
    }

    buttonClick(e) {
      e.preventDefault();
      let pageModifier = this.state.page;
      if (e.target.id === 'left-button') {
        this.setState({
          page: pageModifier - 1
        });
      } else {
          this.setState({
            page: pageModifier + 1
          });
      }
      console.log(`PAGE: ${this.state.page}`);
      console.log(`PAGE > LENGTH?: ${this.props.productsList.data.length}`);
      this.refreshCarousel();
    }

    render() {
        return (
            <div id="related-products-carousel">
            <div id="left-button-container">
            {
                this.state.page === 0 ?
                <div id="left-button-placeholder"> </div>
                :
                <img id="left-button" src="client/pix/left-button.jpg" alt="left carousel arrow" onClick={this.buttonClick} />
            }
            </div>
            {
                this.state.related_products.length > 0 ?
                this.state.related_products.map((productId, index) => (
                    <RelatedProductCard key={productId} productId={productId} />
                ))
                :
                <h3>Loading "Related Cards"...</h3>
            }
            <div id="right-button-container">
            {
                this.state.page + this.state.window_size + 1 >= this.props.productsList.data.length ?
                <div id="right-button-placeholder"> </div>
                :
                <img id="right-button" src="client/pix/right-button.jpg" alt="right carousel arrow" onClick={this.buttonClick} />
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

export default RelatedProductsList;