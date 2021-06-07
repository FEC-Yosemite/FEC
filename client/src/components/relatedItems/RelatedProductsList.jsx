import React, { Component } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

class RelatedProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            window: [],
            window_size: 2,
            left_arrow: false,
            right_arrow: false,
            related_products: []
        };
        this.refreshCarousel = this.refreshCarousel.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
        this.refreshCarousel()
    }

    refreshCarousel() {
        let products_window = [];
        for (let i = this.state.page; i < this.state.window_size * this.state.page; i++) {
            if (i < this.props.productsList.data.length) {
                console.log(`i: ${i}`);
                products_window.push(this.props.productsList.data[i]);
            }
        }
        this.setState({
            related_products: products_window
        });
        //if page + n - 1 >= this.props.productsList.data.length
            //remove right arrow
        //if page <= 0
            //remove left arrow
        //let tempWindow = [];
        //for (let i = page; i < this.props.productsList.data.length; i++) {
            //tempWindow.push(this.props.productsList.data[i]);
        //}
        //this.setState({
            //window: tempWindow
        //});
        // this.state.page + this.state.window_size >= this.props.productsList.data.length
        // this.state.page === 0
    }

    buttonClick(e) {
      e.preventDefault();
      // page * n = first index of window that is n big
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
            {
                this.state.page === 0 ?
                <div id="left-button-placeholder"> </div>
                :
                <img id="left-button" src="../pix/left-button.jpg" onClick={this.buttonClick} />
            }
            {
                this.state.related_products.length > 0 ?
                this.state.related_products.map((productId, index) => (
                    <RelatedProductCard key={index} productId={productId} />
                ))
                :
                <h3>Loading "Related Cards"...</h3>
            }
            {
                this.state.page + this.state.window_size >= this.props.productsList.data.length ?
                <div id="right-button-placeholder"> </div>
                :
                <img id="right-button" src="../pix/right-button.jpg" onClick={this.buttonClick} />
            }
            <div></div>
            <h1>BELOW IS WHOLE LIST</h1>
            <br/>
            {
                Object.keys(this.props.productsList).length > 0 ?
                this.props.productsList.data.map((productId, index) => (
                    <RelatedProductCard key={index} productId={productId} />
                ))
                :
                <h3>Loading "Related Cards"...</h3>
            }
            </div>
        );
    }
}

export default RelatedProductsList;