import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: 0
    }

    this.renderStars = this.renderStars.bind(this);
    this.hoverStar = this.hoverStar.bind(this);
    this.unhoverStar = this.unhoverStar.bind(this);
  }

  hoverStar(e) {
    let id = parseInt(e.target.id.slice(4));
    console.log(id);
    if (isNaN(id)) {

    }
    this.setState({
      hovered: id
    })
  }

  unhoverStar(e) {
    e.target.classList.remove('spin');
    this.setState({
      hovered: 0
    })
  }

  renderStars() {
    let count = 1;
    let stars = [];
    while (count <= this.state.hovered) {
      stars.push(<FontAwesomeIcon className='fa-star' id={'star' + count} icon={fasStar} size='3x' onMouseEnter={ this.hoverStar } />);
      count++;
    }

    while (stars.length < 5) {
      stars.push(<FontAwesomeIcon className='fa-star' id={'star' + count} icon={farStar} size='3x' onMouseEnter={ this.hoverStar } />);
      count++;
    }

    return stars.map((star) => {
      return star;
    });
  }

  render() {
    if (this.props.show) {
      return (
        <div id='modal'>
          <div id='modal-head'>
          <h2>Write Your Review</h2>
          About the { this.props.product }
          </div>
            <div id='modal-stars' onMouseLeave={ this.unhoverStar }>
              { this.renderStars() }
            </div>
          <form>
            <input></input>
          </form>
          <button id='close-modal' onClick={ this.props.close }>Close</button>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default WriteReview;