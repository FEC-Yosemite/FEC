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
      collapsed: true,
      zoomed: false,
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
    console.log(prevArrow);
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

  handleZoom(prodImage) {
    if (this.state.collapsed === false) {
      if (this.state.zoomed === false) {
        prodImage.classList.add('zoomed');
        this.setState({ zoomed: true });
      } else {
        prodImage.classList.remove('zoomed');
        this.setState({ zoomed: false });
      }
    }
  }

  handleImageClick(e) {
    let prodImage = e.target;
    if (this.state.collapsed === true) {
      document.getElementById('info-aside').classList.add('collapsed');
      document.getElementById('container').classList.remove('collapsed');
      document.getElementById('container').classList.add('extended');
      prodImage.style.width = '100%';
      this.setState({ collapsed: false });
    }
    this.handleZoom(prodImage);
  };

  handleCollapse() {
    let prodImage = document.getElementById('product-image');
    if (this.state.collapsed === false) {
      document.getElementById('info-aside').classList.remove('collapsed');
      document.getElementById('container').classList.add('collapsed');
      document.getElementById('container').classList.remove('extended');
      prodImage.style.width = 'auto';
      this.setState({ collapsed: true });
    }
  }

  render() {
    return(
      <div id="gallery">

        <div id="jumbotron">
          <p className="hidden prev-arrow" onClick={ this.handlePrevImageClick.bind(this) } >←</p>
          <img id="product-image" onClick={ this.handleImageClick.bind(this) } src={ this.state.currentImage } alt=""></img>
          <p className="next-arrow" onClick={ this.handleNextImageClick.bind(this) } >→</p>

          <div id="thumbnails">
            {this.state.currentImages.map((photo) => {
              let index = this.state.currentImages.indexOf(photo);
              return (<img data-url={photo.url} data-index={index} onClick={ this.handleThumbnailClick.bind(this) } className="thumbnail" src={photo.thumbnail_url} alt=""></img>)
            })}
          </div>

          <span onClick={ this.handleCollapse.bind(this) }>X</span>

        </div>


      </div>
    );
  }
}

export default Gallery;