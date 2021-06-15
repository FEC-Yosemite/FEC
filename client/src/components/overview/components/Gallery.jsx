import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle as fasFaCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farFaCircle } from '@fortawesome/free-regular-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImages: [],
      currentImage: '',
      currentThumb: '',
      currentIndex: 0,
      collapsed: true,
      zoomed: false,
      currentStyle: 0,
      thumbIndex: 0,
    };
  }

  componentDidMount() {
    this.refreshProduct();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStyle !== prevProps.currentStyle) {
      this.setState({
        currentStyle: this.props.currentStyle,
        currentImages: this.props.styles[this.props.currentStyle].photos,
        currentImage: this.props.styles[this.props.currentStyle].photos[0].url,
        currentThumb: this.props.styles[this.props.currentStyle].photos[0].thumbnail_url,
        currentIndex: 0,
        thumbIndex: 0,
      })
    }
  }

  refreshProduct() {
    this.setState({
      currentImages: this.props.styles[this.state.currentStyle].photos,
      currentImage: this.props.styles[this.state.currentStyle].photos[0].url,
      currentThumb: this.props.styles[this.state.currentStyle].photos[0].thumbnail_url,
    })
  }

  handleImageChange(index) {
    this.setState({
      currentIndex: index,
      currentImage: this.state.currentImages[index].url,
      currentThumb: this.state.currentImages[index].thumbnail_url,
    });
  }

  handleNextImageClick(e) {
    this.props.interact(e);
    document.getElementById('product-image').classList.add('slide-left');
    setTimeout(function(){ document.getElementById('product-image').classList.remove('slide-left'); }, 1000);
    let index = this.state.currentIndex;
    if (index !== this.state.currentImages.length - 1) {
      index++;
      this.handleImageChange(index);
    }
  }

  handlePrevImageClick(e) {
    this.props.interact(e);
    document.getElementById('product-image').classList.add('slide-right');
    setTimeout(function(){ document.getElementById('product-image').classList.remove('slide-right'); }, 1000);
    let index = this.state.currentIndex;
    if (index !== 0) {
      index--;
      this.handleImageChange(index);
    }
  }

  handleThumbnailClick(e) {
    this.props.interact(e);
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
    this.props.interact(e);
    const prodImage = e.target;
    if (this.state.collapsed === true) {
      document.getElementById('info-aside').classList.add('collapsed');
      document.getElementById('container').classList.remove('collapsed');
      document.getElementById('container').classList.add('extended');
      this.setState({ collapsed: false });
    }
    this.handleZoom(prodImage);
  }

  handleCollapse(e) {
    this.props.interact(e);
    const prodImage = document.getElementById('product-image');
    if (this.state.collapsed === false) {
      if (this.state.zoomed === true) {
        this.handleZoom(prodImage);
      }
      document.getElementById('info-aside').classList.remove('collapsed');
      document.getElementById('container').classList.add('collapsed');
      document.getElementById('container').classList.remove('extended');
      this.setState({ collapsed: true });
    }
  }

  scrollThumbnailsDown(e) {
    this.props.interact(e);
    let increaser = this.state.thumbIndex;
    if (increaser !== this.state.currentImages.length - 7) {
      increaser++;
      this.setState({ thumbIndex: increaser })
    }

  }

  scrollThumbnailsUp(e) {
    this.props.interact(e);
    let increaser = this.state.thumbIndex;
    if (increaser !== 0) {
      increaser--;
      this.setState({ thumbIndex: increaser })
    }

  }

  renderThumbnailCarousel(input) {
    let renderArray = [];
    let count = 0;

    for (var i = input; i < this.state.currentImages.length; i++) {
      count++;
      const index = i;
      let photo = this.state.currentImages[i]

      if (count <= 7) {
        if (index === this.state.currentIndex) {
          let thumb = <img key={index} data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail current-thumb" src={photo.thumbnail_url} alt="" />;
          renderArray.push(thumb);
        } else {
          let thumb = <img key={index} data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail" src={photo.thumbnail_url} alt="" />;
          renderArray.push(thumb);
        }
      }
    }

    return renderArray.map((thumb) => {
      return thumb;
    });
  }

  renderThumbnails(input) {
    if (this.state.currentImages.length > 7 && this.state.collapsed === true) {
      return this.renderThumbnailCarousel(input);
    } else {
      if (this.state.collapsed === true) {
        return this.state.currentImages.map((photo) => {
          const index = this.state.currentImages.indexOf(photo);
          if (index === this.state.currentIndex) {
            return <img key={index} data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail current-thumb" src={photo.thumbnail_url} alt="" />;
          }
          return <img key={index} data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail" src={photo.thumbnail_url} alt="" />;
        });
      }
      return this.renderThumbnailIcons();
    }
  }

  renderThumbnailIcons() {
    return this.state.currentImages.map((photo) => {
      const index = this.state.currentImages.indexOf(photo);
      if (index === this.state.currentIndex) {
        return <FontAwesomeIcon key={index} data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail-icon" icon={fasFaCircle} />;
      }
      return <FontAwesomeIcon key={index} data-url={photo.url} data-index={index} onClick={this.handleThumbnailClick.bind(this)} className="thumbnail-icon" icon={farFaCircle} />;
    });
  }

  renderPrevArrow() {
    if (this.state.currentIndex !== 0) {
      return <FontAwesomeIcon className="prev-arrow" onClick={this.handlePrevImageClick.bind(this)} icon={faArrowLeft} />;
    }
  }

  renderNextArrow() {
    if (this.state.currentIndex !== this.state.currentImages.length - 1) {
      return <FontAwesomeIcon className="next-arrow" onClick={this.handleNextImageClick.bind(this)} icon={faArrowRight} />;
    }
  }

  render() {
    return (
      <div id="gallery">

        <FontAwesomeIcon className="expand" onClick={this.handleCollapse.bind(this)} icon={ faExpand } />
        <div id="jumbotron">
          {this.renderPrevArrow()}

          { this.state.currentImage !== null ? <img id="product-image" onClick={this.handleImageClick.bind(this)} src={this.state.currentImage} alt="" /> : <img id="product-image" onClick={this.handleImageClick.bind(this)} src="https://nelowvision.com/wp-content/uploads/2018/11/Picture-Unavailable.jpg" alt="" /> }
          {this.renderNextArrow()}
          <div id="thumbnails">
            <div className="chevron-up-holder">{(this.state.currentImages.length > 7 && this.state.collapsed && this.state.thumbIndex !== 0) && <FontAwesomeIcon onClick={ this.scrollThumbnailsUp.bind(this) } className="chevron chevron-up" icon={ faChevronUp } />}</div>

            <div className="thumb-holder">{ this.renderThumbnails(this.state.thumbIndex) }</div>

            <div className="chevron-down-holder">{(this.state.currentImages.length > 7 && this.state.collapsed && this.state.thumbIndex !== this.state.currentImages.length - 7) && <FontAwesomeIcon onClick={ this.scrollThumbnailsDown.bind(this) } className="chevron chevron-down" icon={ faChevronDown } />}</div>
          </div>

        </div>

      </div>
    );
  }
}

export default Gallery;
