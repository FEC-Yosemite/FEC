import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: 0,
      stars: null,
      size: 'None Selected',
      width: 'None Selected',
      comfort: 'None Selected',
      quality: 'None Selected',
      length: 'None Selected',
      fit: 'None Selected'
    }

    this.renderStars = this.renderStars.bind(this);
    this.hoverStar = this.hoverStar.bind(this);
    this.unhoverStar = this.unhoverStar.bind(this);
    this.selectStar = this.selectStar.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleWidth = this.handleWidth.bind(this);
    this.handleComfort = this.handleComfort.bind(this);
    this.handleQuality = this.handleQuality.bind(this);
    this.handleLength = this.handleLength.bind(this);
    this.handleFit = this.handleFit.bind(this);
  }

  handleFit(e) {
    let text = '';
    let num = parseInt(e.target.value);

    if (num === 1) {
      text = 'Runs tight'
    }
    if (num === 2) {
      text = 'Runs slightly tight'
    }
    if (num === 3) {
      text = 'Perfect'
    }
    if (num === 4) {
      text = 'Runs slightly long'
    }
    if (num === 5) {
      text = 'Runs long'
    }

    this.setState({
      fit: text
    })
  }

  handleLength(e) {
    let text = '';
    let num = parseInt(e.target.value);

    if (num === 1) {
      text = 'Runs short'
    }
    if (num === 2) {
      text = 'Runs slightly short'
    }
    if (num === 3) {
      text = 'Perfect'
    }
    if (num === 4) {
      text = 'Runs slightly long'
    }
    if (num === 5) {
      text = 'Runs long'
    }

    this.setState({
      length: text
    })
  }

  handleQuality(e) {
    let text = '';
    let num = parseInt(e.target.value);

    if (num === 1) {
      text = 'Poor'
    }
    if (num === 2) {
      text = 'Below average'
    }
    if (num === 3) {
      text = 'What I expected'
    }
    if (num === 4) {
      text = 'Pretty great'
    }
    if (num === 5) {
      text = 'Perfect'
    }

    this.setState({
      quality: text
    })
  }

  handleComfort(e) {
    let text = '';
    let num = parseInt(e.target.value);

    if (num === 1) {
      text = 'Uncomfortable'
    }
    if (num === 2) {
      text = 'Slightly uncomfortable'
    }
    if (num === 3) {
      text = 'Ok'
    }
    if (num === 4) {
      text = 'Comfortable'
    }
    if (num === 5) {
      text = 'Perfect'
    }

    this.setState({
      comfort: text
    })
  }

  handleWidth(e) {
    let text = '';
    let num = parseInt(e.target.value);

    if (num === 1) {
      text = 'Too narrow'
    }
    if (num === 2) {
      text = 'Slightly narrow'
    }
    if (num === 3) {
      text = 'Perfect'
    }
    if (num === 4) {
      text = 'Slightly wide'
    }
    if (num === 5) {
      text = 'Too wide'
    }

    this.setState({
      width: text
    })
  }

  handleSize(e) {
    let text = '';
    let num = parseInt(e.target.value);

    if (num === 1) {
      text = 'A size too small'
    }
    if (num === 2) {
      text = 'Half a size too small'
    }
    if (num === 3) {
      text = 'Perfect'
    }
    if (num === 4) {
      text = 'Half a size too big'
    }
    if (num === 5) {
      text = 'A size too big'
    }

    this.setState({
      size: text
    })
  }

  getRating(num) {
    if (num === 1) {
      return "Poor";
    }
    if (num === 2) {
      return "Fair";
    }
    if (num === 3) {
      return "Average";
    }
    if (num === 4) {
      return "Good";
    }
    if (num === 5) {
      return "Great";
    }
  }

  selectStar(e) {
    let id = parseInt(e.currentTarget.id.slice(4));
    this.setState({
      hovered: id,
      stars: id
    })
  }

  hoverStar(e) {
    if (!this.state.stars) {
      let id = parseInt(e.currentTarget.id.slice(4));
      this.setState({
        hovered: id
      })
    }
  }

  unhoverStar(e) {
    if (!this.state.stars) {
      this.setState({
        hovered: 0
      })
    }
  }

  renderStars() {
    let count = 1;
    let stars = [];
    while (count <= this.state.hovered) {
      stars.push(<FontAwesomeIcon className='fa-star' id={'star' + count} icon={fasStar} size='3x' onMouseEnter={ this.hoverStar } onClick={ this.selectStar }/>);
      count++;
    }

    while (stars.length < 5) {
      stars.push(<FontAwesomeIcon className='fa-star' id={'star' + count} icon={farStar} size='3x' onMouseEnter={ this.hoverStar} onClick={ this.selectStar } />);
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
              { this.renderStars() } <h3>{ this.state.stars ? this.state.stars + ' stars - ' + this.getRating(this.state.stars) : null}</h3>
            </div>

          <hr></hr>

          <form id='review-form'>
            <div id='form-recommend'>
              <h3>Do you recommend this product?</h3>
                <label>
                  Yes
                  <input type='radio' id='recommend-yes' name='recommend' value='yes'></input>
                </label>
                <label>
                  No
                  <input type='radio' id='recommend-no' name='recommend' value='no'></input>
                </label>
            </div>
            <div className='row'>
              <div id='form-characteristics'>
                <h3>Characteristics</h3>
                <div id='chars-size'>
                  <p>{ this.state.size }</p>
                  Size:
                  <input onChange={ this.handleSize } type='radio' id='size-1' name='size' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleSize } type='radio' id='size-2' name='size' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleSize } type='radio' id='size-3' name='size' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleSize } type='radio' id='size-4' name='size' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleSize } type='radio' id='size-5' name='size' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-width'>
                  <p>{ this.state.width }</p>
                  Width:
                  <input onChange={ this.handleWidth } type='radio' id='width-1' name='width' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleWidth } type='radio' id='width-2' name='width' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleWidth } type='radio' id='width-3' name='width' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleWidth } type='radio' id='width-4' name='width' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleWidth } type='radio' id='width-5' name='width' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-comfort'>
                  <p>{ this.state.comfort }</p>
                  Comfort:
                  <input onChange={ this.handleComfort } type='radio' id='comfort-1' name='comfort' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleComfort } type='radio' id='comfort-2' name='comfort' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleComfort } type='radio' id='comfort-3' name='comfort' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleComfort } type='radio' id='comfort-4' name='comfort' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleComfort } type='radio' id='comfort-5' name='comfort' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-quality'>
                  <p>{ this.state.quality }</p>
                  Quality:
                  <input onChange={ this.handleQuality } type='radio' id='quality-1' name='quality' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleQuality } type='radio' id='quality-2' name='quality' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleQuality } type='radio' id='quality-3' name='quality' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleQuality } type='radio' id='quality-4' name='quality' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleQuality } type='radio' id='quality-5' name='quality' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-length'>
                  <p>{ this.state.length }</p>
                  Length:
                  <input onChange={ this.handleLength } type='radio' id='length-1' name='length' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleLength } type='radio' id='length-2' name='length' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleLength } type='radio' id='length-3' name='length' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleLength } type='radio' id='length-4' name='length' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleLength } type='radio' id='length-5' name='length' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-fit'>
                  <p>{ this.state.fit }</p>
                  Fit:
                  <input onChange={ this.handleFit } type='radio' id='fit-1' name='fit' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleFit } type='radio' id='fit-2' name='fit' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleFit } type='radio' id='fit-3' name='fit' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleFit } type='radio' id='fit-4' name='fit' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleFit } type='radio' id='fit-5' name='fit' value='5'></input>
                  <label>5</label>
                </div>
              </div>
              <div id='form-content'>
                <h3>Review</h3>
                <p>
                <label>
                  Name:
                  <input id='form-name' type='text'></input>
                </label>
                </p>

                <p>
                <label>
                  Email:
                  <input id='form-email' type='email'></input>
                </label>
                </p>

                <p>
                <label>
                  Summary:
                  <input id='form-summary' type='text'></input>
                </label>
                </p>

                <p id='textarea-p'>
                  <label>
                    Body:
                    <textarea id='form-body' type='text'></textarea>
                  </label>
                </p>
              </div>
            </div>
          <button id='form-submit' onClick={ this.handleSubmit }>Submit</button>
          </form>
          <button id='close-modal' onClick={ this.props.close }>X</button>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default WriteReview;