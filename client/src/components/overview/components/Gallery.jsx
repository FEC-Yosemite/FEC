import React from 'react';

import { getProductStyles } from '../../../requests.js';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      currentImages: [],
      currentImage: '',
      currentIndex: 0,
    };
  }

  componentDidMount() {
    getProductStyles(this.props.productId)
      .then((res) => this.setState({
        styles: res.data.results,
      }))
      .then(() => this.setState({
        currentImages: this.state.styles[0].photos,
        currentImage: this.state.styles[0].photos[0].url,
      }))
      .then(() => console.log(this.state.currentImages) )
      .catch((err) => console.log('ERROR:', err));
  }

  handleNextImageClick() {
    let index = this.state.currentIndex;
    if (index !== this.state.currentImages.length - 1) {
      index++;
      this.setState({
        currentIndex: index,
        currentImage: this.state.currentImages[index].url,
      });
    }
  };

  handlePrevImageClick() {
    let index = this.state.currentIndex;
    if (index !== 0) {
      index--;
      this.setState({
        currentIndex: index,
        currentImage: this.state.currentImages[index].url,
      });
    }
  };

  handleThumbClick(e) {
    this.setState({
      currentImage: e.target.getAttribute('data-url'),
      currentIndex: e.target.getAttribute('data-index'),
    });
  }

  render() {
    return(
      <div id="gallery">
        <p onClick={ this.handlePrevImageClick.bind(this) } >←</p>
        <img  src={ this.state.currentImage } alt=""></img>
        <p onClick={ this.handleNextImageClick.bind(this) } >→</p>
        <div>
          {this.state.currentImages.map((photo) => {
            let index = this.state.currentImages.indexOf(photo);
            return (<img data-url={photo.url} data-index={index} onClick={ this.handleThumbClick.bind(this) } class="thumbnail" src={photo.thumbnail_url} alt="" ></img>)
          })}
        </div>
      </div>
    );
  }
}

export default Gallery;