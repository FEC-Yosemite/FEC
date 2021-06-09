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
      form: {
        characteristics: {
          size: null,
          width: null,
          comfort: null,
          quality: null,
          length: null,
          fit: null
        },
        recommend: null,
        name: '',
        email: '',
        summary: '',
        body: ''
      }
    }

    this.renderStars = this.renderStars.bind(this);
    this.hoverStar = this.hoverStar.bind(this);
    this.unhoverStar = this.unhoverStar.bind(this);
    this.selectStar = this.selectStar.bind(this);
    this.getSize = this.getSize.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.getComfort = this.getComfort.bind(this);
    this.getQuality = this.getQuality.bind(this);
    this.getLength = this.getLength.bind(this);
    this.getFit = this.getFit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.fileInput = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = this.state.form;

    console.log(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  handleInputChange(e) {
    let val = e.target.value;
    let name = e.target.name;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: val
      }
    }))
  }

  handleRadioChange(e) {
    let num = parseInt(e.target.value);
    let name = e.target.name;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        characteristics: {
          ...prevState.form.characteristics,
          [name]: num
        }
      }
    }))
  }

  getFit() {
    let fit = this.state.form.characteristics.fit;

    if (fit === 1) {
      return 'Runs tight'
    }
    if (fit === 2) {
      return 'Runs slightly tight'
    }
    if (fit === 3) {
      return 'Perfect'
    }
    if (fit === 4) {
      return 'Runs slightly long'
    }
    if (fit === 5) {
      return 'Runs long'
    } else {
      return 'None selected'
    }
  }

  getLength() {
    let length = this.state.form.characteristics.length

    if (length === 1) {
      return 'Runs short'
    }
    if (length === 2) {
      return 'Runs slightly short'
    }
    if (length === 3) {
      return 'Perfect'
    }
    if (length === 4) {
      return 'Runs slightly long'
    }
    if (length === 5) {
      return 'Runs long'
    } else {
      return 'None selected'
    }
  }

  getQuality() {
    let quality = this.state.form.characteristics.quality;

    if (quality === 1) {
      return 'Poor'
    }
    if (quality === 2) {
      return 'Below average'
    }
    if (quality === 3) {
      return 'What I expected'
    }
    if (quality === 4) {
      return 'Pretty great'
    }
    if (quality === 5) {
      return 'Perfect'
    } else {
      return 'None selected'
    }
  }

  getComfort() {
    let comfort = this.state.form.characteristics.comfort;

    if (comfort === 1) {
      return 'Uncomfortable'
    }
    if (comfort === 2) {
      return 'Slightly uncomfortable'
    }
    if (comfort === 3) {
      return 'Ok'
    }
    if (comfort === 4) {
      return 'Comfortable'
    }
    if (comfort === 5) {
      return 'Perfect'
    } else {
      return 'None selected'
    }
  }

  getWidth() {
    let width = this.state.form.characteristics.width;

    if (width === 1) {
      return 'Too narrow'
    }
    if (width === 2) {
      return 'Slightly narrow'
    }
    if (width === 3) {
      return 'Perfect'
    }
    if (width === 4) {
      return 'Slightly wide'
    }
    if (width === 5) {
      return 'Too wide'
    } else {
      return 'None selected'
    }
  }

  getSize() {
    let size = this.state.form.characteristics.size

    if (size === 1) {
      return 'A size too small'
    }
    if (size === 2) {
      return 'Half a size too small'
    }
    if (size === 3) {
      return 'Perfect'
    }
    if (size === 4) {
      return 'Half a size too big'
    }
    if (size === 5) {
      return 'A size too big'
    } else {
      return 'None selected'
    }
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

  handleClose() {
    this.setState({
      hovered: 0,
      stars: null,
      form: {
        characteristics: {
          size: null,
          width: null,
          comfort: null,
          quality: null,
          length: null,
          fit: null
        },
        recommend: null,
        name: '',
        email: '',
        summary: '',
        body: ''
      }
    })
    this.props.close();
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
                  <input type='radio' id='recommend-yes' name='recommend' value='yes' onChange={ this.handleInputChange }></input>
                </label>
                <label>
                  No
                  <input type='radio' id='recommend-no' name='recommend' value='no' onChange={ this.handleInputChange }></input>
                </label>
            </div>
            <div className='row'>
              <div id='form-characteristics'>
                <h3>Characteristics</h3>
                <div id='chars-size'>
                  <p>{ this.getSize() }</p>
                  Size:
                  <input onChange={ this.handleRadioChange } type='radio' id='size-1' name='size' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='size-2' name='size' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='size-3' name='size' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='size-4' name='size' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='size-5' name='size' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-width'>
                  <p>{ this.getWidth() }</p>
                  Width:
                  <input onChange={ this.handleRadioChange } type='radio' id='width-1' name='width' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='width-2' name='width' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='width-3' name='width' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='width-4' name='width' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='width-5' name='width' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-comfort'>
                  <p>{ this.getComfort() }</p>
                  Comfort:
                  <input onChange={ this.handleRadioChange } type='radio' id='comfort-1' name='comfort' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='comfort-2' name='comfort' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='comfort-3' name='comfort' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='comfort-4' name='comfort' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='comfort-5' name='comfort' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-quality'>
                  <p>{ this.getQuality() }</p>
                  Quality:
                  <input onChange={ this.handleRadioChange } type='radio' id='quality-1' name='quality' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='quality-2' name='quality' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='quality-3' name='quality' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='quality-4' name='quality' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='quality-5' name='quality' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-length'>
                  <p>{ this.getLength() }</p>
                  Length:
                  <input onChange={ this.handleRadioChange } type='radio' id='length-1' name='length' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='length-2' name='length' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='length-3' name='length' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='length-4' name='length' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='length-5' name='length' value='5'></input>
                  <label>5</label>
                </div>

                <div id='chars-fit'>
                  <p>{ this.getFit() }</p>
                  Fit:
                  <input onChange={ this.handleRadioChange } type='radio' id='fit-1' name='fit' value='1'></input>
                  <label>1</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='fit-2' name='fit' value='2'></input>
                  <label>2</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='fit-3' name='fit' value='3'></input>
                  <label>3</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='fit-4' name='fit' value='4'></input>
                  <label>4</label>
                  <input onChange={ this.handleRadioChange } type='radio' id='fit-5' name='fit' value='5'></input>
                  <label>5</label>
                </div>
              </div>
              <div id='form-content'>
                <h3>Review</h3>
                <p>
                <label>
                  Name:
                  <input id='form-name' type='text' name='name' onChange={ this.handleInputChange }></input>
                </label>
                </p>

                <p>
                <label>
                  Email:
                  <input id='form-email' type='email' name='email' onChange={ this.handleInputChange }></input>
                </label>
                </p>

                <p>
                <label>
                  Summary:
                  <input id='form-summary' type='text' name='summary' onChange={ this.handleInputChange }></input>
                </label>
                </p>

                <p id='textarea-p'>
                  <label>
                    Body:
                    <textarea id='form-body' type='text' name='body' onChange={ this.handleInputChange }></textarea>
                  </label>
                </p>

                <p id='file-p'>
                  <label>
                    Photos:
                    <input id='form-file' type='file' name='photos' ref={ this.fileInput }></input>
                  </label>
                </p>
              </div>
            </div>
          <button id='form-submit' onClick={ this.handleSubmit }>Submit</button>
          </form>
          <button id='close-modal' onClick={ this.handleClose }>X</button>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default WriteReview;