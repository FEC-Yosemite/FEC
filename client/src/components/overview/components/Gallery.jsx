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
      currentIndex: 1,
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
        currentImage: this.state.styles[0].photos[1].url,
        currentThumb: this.state.styles[0].photos[1].thumbnail_url,
      }))
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
  };

  handlePrevImageClick() {
    let index = this.state.currentIndex;
    if (index !== 0) {
      index--;
      this.handleImageChange(index);
    };
    this.handleThumbnailHighlight(index);
  };

  handleThumbnailClick(e) {
    let index = Number(e.target.getAttribute('data-index'));
    this.setState({
      currentImage: e.target.getAttribute('data-url'),
      currentIndex: index,
    });
  }

  handleMouseMove(e) {
    let prodImage = e.target;
    let left = -(e.offsetX/e.target.width*100);
    let top = e.offsetY/e.target.height*100;
    console.log("LEFT: ",left)
    console.log("TOP: ",top)
    prodImage.style.objectPosition = `${left}px ${top}%`;
  }

  handleZoom(prodImage) {
    if (this.state.collapsed === false) {
      if (this.state.zoomed === false) {
        prodImage.classList.add('zoomed');
        prodImage.addEventListener('mousemove', this.handleMouseMove);
        this.setState({ zoomed: true });
      } else {
        prodImage.classList.remove('zoomed');
        prodImage.removeEventListener('mousemove', this.handleMouseMove);
        this.setState({ zoomed: false });
        prodImage.style.objectPosition = 'center center';
      }
    }
  }

  handleImageClick(e) {
    let prodImage = e.target;
    if (this.state.collapsed === true) {
      document.getElementById('info-aside').classList.add('collapsed');
      document.getElementById('container').classList.remove('collapsed');
      document.getElementById('container').classList.add('extended');
      this.setState({ collapsed: false });
    }
    this.handleZoom(prodImage);
  }

  handleCollapse() {
    let prodImage = document.getElementById('product-image');
    if (this.state.collapsed === false) {
      document.getElementById('info-aside').classList.remove('collapsed');
      document.getElementById('container').classList.add('collapsed');
      document.getElementById('container').classList.remove('extended');
      this.setState({ collapsed: true });
    }
  }

  renderThumbnails() {
    if (this.state.collapsed === true) {
      return this.state.currentImages.map((photo) => {
        let index = this.state.currentImages.indexOf(photo);
        if (index === this.state.currentIndex) {
          return (<img data-url={photo.url} data-index={index} onClick={ this.handleThumbnailClick.bind(this) } className="thumbnail current-thumb" src={photo.thumbnail_url} alt=""></img>);
        }
          return (<img data-url={photo.url} data-index={index} onClick={ this.handleThumbnailClick.bind(this) } className="thumbnail" src={photo.thumbnail_url} alt=""></img>);
      });
    } else {
      return this.state.currentImages.map((photo) => {
        let index = this.state.currentImages.indexOf(photo);
        if (index === this.state.currentIndex) {
          return (<p data-url={photo.url} data-index={index} onClick={ this.handleThumbnailClick.bind(this) } className="thumbnail-icon current-thumb-icon">*</p>);
        }
          return (<p data-url={photo.url} data-index={index} onClick={ this.handleThumbnailClick.bind(this) } className="thumbnail-icon">*</p>);
      });
    }
  }

  renderPrevArrow() {
    if (this.state.currentIndex !== 0) {
      return <p className="prev-arrow" onClick={ this.handlePrevImageClick.bind(this) } >←</p>
    }
  }

  renderNextArrow() {
    if (this.state.currentIndex !== this.state.styles.length - 1) {
      return <p className="next-arrow" onClick={ this.handleNextImageClick.bind(this) } >→</p>
    }
  }

  render() {
    return(
      <div id="gallery">

        <div id="jumbotron">
          {this.renderPrevArrow()}
          <img id="product-image" onClick={ this.handleImageClick.bind(this) } src={ this.state.currentImage } alt=""></img>
          {this.renderNextArrow()}

          <div id="thumbnails">
            {this.renderThumbnails()}
          </div>

          <span onClick={ this.handleCollapse.bind(this) }>X</span>

        </div>


      </div>
    );
  }
}

export default Gallery;