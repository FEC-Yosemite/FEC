import React, { Component } from 'react';
import { getProductById, getProductStyles, getReviewMeta } from  '../../requests.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose as fasWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose as farWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import quarterStar from '../../../pix/svgs/starquarter.svg';
import threeQuarterStar from '../../../pix/svgs/star3quarters.svg';
import star from '../../../pix/svgs/star.svg';
import starEmpty from '../../../pix/svgs/star-o.svg';
import starHalf from '../../../pix/svgs/star-half-empty.svg';

class RelatedProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            styles: null,
            star: farStar,
            star_state: false,
            type: null,
            ratingAvg: 0,
            ratingTotal: 0,
            meta: {
              characteristics: {},
              ratings: {},
              recommended: {}
            }
        };
        this.renderStars = this.renderStars.bind(this);
        this.getRatings = this.getRatings.bind(this);
        this.refreshProduct = this.refreshProduct.bind(this);
        this.productClickHandler = this.productClickHandler.bind(this);
        this.starEnter = this.starEnter.bind(this);
        this.starLeave = this.starLeave.bind(this);
    }

    renderStars() {
        let stars = [];
        let avg = this.state.ratingAvg;
        let whole = Math.floor(avg);
        let float = avg % 1;

        while (stars.length < whole) {
            stars.push(<img src={ star }/>)
        }

        if (float > 0 && float <= 0.33) {
            stars.push(<img src={ quarterStar }/>)
        } else if (float > 0.33 && float <= 0.67) {
            stars.push(<img src={ starHalf }/>)
        } else if (float > 0.67 && float < 1) {
            stars.push(<img src={ threeQuarterStar }/>)
        }

        while (stars.length < 5) {
            stars.push(<img src={ starEmpty }/>)
        }
        return stars;
    }

    getRatings() {
        const keys = Object.keys(this.state.meta.ratings);
        if (keys.length === 0) return 'No reviews yet';
        let total = 0;
        let count = 0;
        keys.map((key) => {
            total += Number(key) * Number(this.state.meta.ratings[key]);
            count += Number(this.state.meta.ratings[key]);
        })
        let avg = (total / count).toFixed(1);
        this.setState({
            ratingAvg: avg,
            ratingTotal: count
        })
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
                this.props.toTop();
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
        if (this.props.productId !== 0) {
            getReviewMeta(this.props.productId)
            .then(res => {
            this.setState({
                meta: res.data
            });
            })
            .then( () => {
                this.getRatings();
            })
            .catch(err => console.log('ERROR:', err))
        }
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
                    <div id="product-card" className="add-outfit">
                    <FontAwesomeIcon icon={faTshirt} className="faTshirt" />
                    <FontAwesomeIcon icon={faPlus} className="faPlus" />
                    </div>
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
                        { this.state.styles[2].sale_price ?
                            <>
                            <p className="original-price price">{ '$' + this.state.styles[2].original_price }</p>
                            <p className="sale-price price" >{ ' $' + this.state.styles[2].sale_price }</p>
                            </> :
                            <p className="regular-price price">{ '$' + this.state.styles[2].original_price }</p> }
                        <h4>{this.state.product.name}</h4>
                        <span className="star-rating">{ this.renderStars() }</span>
                        
                    </div>
                }
            </div>
        );
    }
}

export default RelatedProductCard;