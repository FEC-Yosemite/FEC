import React from 'react';

import { getProductStyles } from '../../../requests.js';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      currentImages: [],
      currentImage: '',
      currentThumb: '',
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
        currentThumb: this.state.styles[0].photos[0].thumbnail_url,
      }))
      .then(() => this.handleThumbnailHighlight(0) )
      .catch((err) => console.log('ERROR:', err));
  }

  handleImageChange(index) {
    this.setState({
      currentIndex: index,
      currentImage: this.state.currentImages[index].url,
      currentThumb: this.state.currentImages[index].thumbnail_url,
    });
  }

  handleNextImageClick() {
    let index = this.state.currentIndex;
    if (index !== this.state.currentImages.length - 1) {
      index++;
      this.handleImageChange(index);
    }
    this.handleThumbnailHighlight(index);
  };

  handlePrevImageClick() {
    let index = this.state.currentIndex;
    if (index !== 0) {
      index--;
      this.handleImageChange(index);
    };
    this.handleThumbnailHighlight(index);
  };

  handleArrowHide(index) {
    let prevArrow = document.getElementsByClassName('prev-arrow')[0];
    let nextArrow = document.getElementsByClassName('next-arrow')[0];
    if (index === 0) {
      prevArrow.classList.add('hidden');
      nextArrow.classList.remove('hidden');
    } else if (index === this.state.currentImages.length - 1) {
      prevArrow.classList.remove('hidden');
      nextArrow.classList.add('hidden');
    } else {
      prevArrow.classList.remove('hidden');
      nextArrow.classList.remove('hidden');
    }
  }

  handleThumbnailHighlight(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail) => {
      if (Number(thumbnail.dataset.index) === index) {
        thumbnail.classList.add('current-thumb');
      } else {
        thumbnail.classList.remove('current-thumb');
      }
    });
    this.handleArrowHide(index);
  }

  handleThumbnailClick(e) {
    let index = Number(e.target.getAttribute('data-index'));
    this.setState({
      currentImage: e.target.getAttribute('data-url'),
      currentIndex: index,
    });
    this.handleThumbnailHighlight(index);
  }

  render() {
    return(
      <div id="gallery">
        <p className="hidden prev-arrow" onClick={ this.handlePrevImageClick.bind(this) } >←</p>
        <img  src={ this.state.currentImage } alt=""></img>
        <p className="next-arrow" onClick={ this.handleNextImageClick.bind(this) } >→</p>
        <div>
          {this.state.currentImages.map((photo) => {
            let index = this.state.currentImages.indexOf(photo);
            return (<img data-url={photo.url} data-index={index} onClick={ this.handleThumbnailClick.bind(this) } className="thumbnail" src={photo.thumbnail_url} alt=""></img>)
          })}
        </div>
      </div>
    );
  }
}

export default Gallery;