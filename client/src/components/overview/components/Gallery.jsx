/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable-next-line class-methods-use-this */
import React from 'react';

import { getProductStyles } from '../../../requests.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle as fasFaCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farFaCircle } from '@fortawesome/free-regular-svg-icons';

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
        currentImage: this.state.styles[0].photos[0].url,
        currentThumb: this.state.styles[0].photos[0].thumbnail_url,
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
  }

  handlePrevImageClick() {
    let index = this.state.currentIndex;
    if (index !== 0) {
      index--;
      this.handleImageChange(index);
    }
    this.handleThumbnailHighlight(index);
  }

  handleThumbnailClick(e) {
    const index = Number(e.target.getAttribute('data-index'));
    this.setState({
      currentImage: e.target.getAttribute('data-url'),
      currentIndex: index,
    });
  }

  handleMouseMove(e) {
    const prodImage = e.target;
    const left = -(e.offsetX / e.target.width * 100);
    const top = e.offsetY / e.target.height * 100;
    console.log('LEFT: ', left);
    console.log('TOP: ', top);
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
    const prodImage = e.target;
    if (this.state.collapsed === true) {
      document.getElementById('info-aside').classList.add('collapsed');
      document.getElementById('container').classList.remove('collapsed');
      document.getElementById('container').classList.add('extended');
      this.setState({ collapsed: false });
    }
    this.handleZoom(prodImage);
  }

  handleCollapse() {
    const prodImage = document.getElementById('product-image');
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
        const index = this.state.currentImages.indexOf(photo);
        if (index === this.state.currentIndex) {
          return (<img data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail current-thumb" src={photo.thumbnail_url} alt="" />);
        }
        return (<img data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail" src={photo.thumbnail_url} alt="" />);
      });
    }
    return this.state.currentImages.map((photo) => {
      const index = this.state.currentImages.indexOf(photo);
      if (index === this.state.currentIndex) {
        return (<FontAwesomeIcon data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail-icon" icon={fasFaCircle} />);
      }
      return (<FontAwesomeIcon data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail-icon" icon={farFaCircle} />);
    });
  }

  renderPrevArrow() {
    if (this.state.currentIndex !== 0) {
      return <FontAwesomeIcon className="prev-arrow" onClick={this.handlePrevImageClick.bind(this)} icon={faArrowLeft} />;
    }
  }

  renderNextArrow() {
    if (this.state.currentIndex !== this.state.styles.length - 1) {
      return <FontAwesomeIcon className="next-arrow" onClick={this.handleNextImageClick.bind(this)} icon={faArrowRight} />;
    }
  }

  render() {
    return (
      <div id="gallery">

        <div id="jumbotron">
          {this.renderPrevArrow()}

          <img id="product-image" onClick={this.handleImageClick.bind(this)} src={this.state.currentImage} alt="" />
          {this.renderNextArrow()}
          <div id="thumbnails">
            {this.renderThumbnails()}
          </div>

          <span onClick={this.handleCollapse.bind(this)}>X</span>

        </div>

      </div>
    );
  }
}

export default Gallery;
