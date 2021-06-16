import React from 'react';
import Overview from './overview/Overview.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import moment from 'moment';
import { getProducts, getProductById, addInteraction, getReviewMeta } from '../requests.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 19089,
      outfits_list: [],
      meta: {
        characteristics: {},
        ratings: {},
        recommended: {}
      }
    }
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.addCurrentToOutfits = this.addCurrentToOutfits.bind(this);
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.handleInteraction = this.handleInteraction.bind(this);
  }

  removeFromOutfit(id) {
    const index = this.state.outfits_list.indexOf(id);
    let newList = this.state.outfits_list.slice();
    newList.splice(index, 1);
    if (index > -1) {
      this.setState({
        outfits_list: newList
      })
    }
  }

  addCurrentToOutfits() {
    if (!this.state.outfits_list.includes(this.state.currentProductId)) {
      this.setState({
        outfits_list: this.state.outfits_list.concat(this.state.currentProductId)
      })
    }
  }

  updateCurrentProduct(e) {
    this.setState({
      currentProductId: e
    })
  }

  handleInteraction(target, widget) {
    let data = {
      element: target,
      widget: widget,
      time: moment().format('DD-MM-YYYY')
    }

    addInteraction(data)
      .catch(err => console.log('ERROR:', err));
  }

  componentDidUpdate(prevprops, prevState) {
    if (this.state.currentProductId !== prevState.currentProductId) {
      getReviewMeta(this.state.currentProductId)
        .then(res => {
          this.setState({
            meta: res.data
          });
        })
        .catch(err => console.log('ERROR:', err))
    }
  }

  componentDidMount() {
    getReviewMeta(this.state.currentProductId)
      .then(res => {
        console.log(res.data);
        this.setState({
          meta: res.data
        });
      })
      .catch(err => console.log('ERROR:', err))
  }

  render() {
    return (
      <div id="app-div">
        <Overview productId={ this.state.currentProductId } interact={ this.handleInteraction } />
        <RelatedItems productId={ this.state.currentProductId } updateCurrentProduct={this.updateCurrentProduct} interact={ target => this.handleInteraction(target, 'Related Items') } outfits_list={this.state.outfits_list} addCurrentToOutfits={this.addCurrentToOutfits} removeFromOutfit={this.removeFromOutfit} />
        <RatingsReviews productId={ this.state.currentProductId } interact={ this.handleInteraction } meta={ this.state.meta }/>
      </div>
    )
  }
}

export default App;
