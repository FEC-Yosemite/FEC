import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { addReview, getReviewMeta } from '../../../requests.js';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: 0,
      stars: null,
      photoUrls: [],
      maxPhotos: false,
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
      },
      incomplete: false,
      badEmail: false
    }

    this.renderStars = this.renderStars.bind(this);
    this.hoverStar = this.hoverStar.bind(this);
    this.unhoverStar = this.unhoverStar.bind(this);
    this.selectStar = this.selectStar.bind(this);
    this.describeSize = this.describeSize.bind(this);
    this.describeWidth = this.describeWidth.bind(this);
    this.describeComfort = this.describeComfort.bind(this);
    this.describeQuality = this.describeQuality.bind(this);
    this.describeLength = this.describeLength.bind(this);
    this.describeFit = this.describeFit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRecommendChange = this.handleRecommendChange.bind(this);
    this.getCharIds = this.getCharIds.bind(this);
    this.completeCheck = this.completeCheck.bind(this);
    this.emailCheck = this.emailCheck.bind(this);
    this.setPics = this.setPics.bind(this);

    this.fileInput = React.createRef();
  }

  getCharIds() {
    let result = {};
    let chars = this.props.chars;
    for (let key in chars) {
      result[chars[key].id] = this.state.form.characteristics[key.toLowerCase()]
    }
    return result;
  }

  validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return (true)
    }
    return (false)
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = this.state.form;
    let photos = this.state.photoUrls.map(url => {
      return url.props.src;
    })
    let complete = true;
    let photoLimit = true

    let data = {
      ...form,
      characteristics: this.getCharIds(),
      rating: this.state.stars,
      product_id: this.props.productId,
      photos: photos.length > 0 ? photos : []
    }

    for (let key in data) {
      if (!data[key] && key !== 'recommend') {
        complete = false;
      }
      if (key === 'recommend' && data[key] === null) {
        complete = false;
      }
    }

    for (let key in data.characteristics) {
      if (!data.characteristics[key]) {
        complete = false;
      }
    }

    if (data.photos.length > 5) {
      console.log('Too many Photos!')
      photoLimit = false
    }

    if (!this.validateEmail(data.email) && data.email.length > 0) {
      complete = false;
      this.setState({
        badEmail: true
      })
    } else {
      this.setState({
        badEmail: false
      })
    }

    if (complete) {
      this.setState({
        incomplete: false
      })
    }

    if (complete && photoLimit) {
      this.setState({
        incomplete: false,
        badEmail: false
      })

      addReview(data)
        .then(res => console.log('Posted!'))
        .then(() => this.props.requests())
        .then(() => this.handleClose())
        .catch(err => {
          console.log('ERROR:', err)
        });
    } else {
      if (!complete) {
        this.setState({
          incomplete: true
        })
      }
      if (!photoLimit) {
        this.setState({
          maxPhotos: true
        })
      }
    }
  }

  handleRecommendChange(e) {
    let val;
    e.target.value === 'yes' ? val = true : val = false;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        recommend: val
      }
    }))
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

  describeFit() {
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

  describeLength() {
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

  describeQuality() {
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

  describeComfort() {
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

  describeWidth() {
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

  describeSize() {
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
      photos: [],
      photoUrls: [],
      maxPhotos: false,
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
      },
      incomplete: false,
      badEmail: false
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

  renderSize() {
    return (
      <div id='chars-size'>
        <p>{ this.describeSize() }</p>
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
    )
  }

  renderWidth() {
    return (
      <div id='chars-width'>
        <p>{ this.describeWidth() }</p>
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
    )
  }

  renderComfort() {
    return (
      <div id='chars-comfort'>
        <p>{ this.describeComfort() }</p>
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
    )
  }

  renderQuality() {
    return (
      <div id='chars-quality'>
        <p>{ this.describeQuality() }</p>
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
    )
  }

  renderLength() {
    return (
      <div id='chars-length'>
        <p>{ this.describeLength() }</p>
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
    )
  }

  renderFit() {
    return(
      <div id='chars-fit'>
        <p>{ this.describeFit() }</p>
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
    )
  }

  renderCharacteristics() {
    let items = [];
    let chars = Object.keys(this.props.chars)

    if (chars.includes('Size')) {
      items.push(this.renderSize())
    }
    if (chars.includes('Width')) {
      items.push(this.renderWidth())
    }
    if (chars.includes('Comfort')) {
      items.push(this.renderComfort())
    }
    if (chars.includes('Quality')) {
      items.push(this.renderQuality())
    }
    if (chars.includes('Length')) {
      items.push(this.renderLength())
    }
    if (chars.includes('Fit')) {
      items.push(this.renderFit())
    }

    return items;
  }

  completeCheck() {
    if (this.state.incomplete) {
      return <p id='form-incomplete'>Please fill out all fields</p>
    } else if (this.state.maxPhotos) {
      return <p id='form-incomplete'>Photo limit exceeded (5)</p>
    } else {
      return null;
    }
  }

  emailCheck() {
    if (this.state.badEmail) {
      return <p id='form-bad-email'>Please enter a valid email address</p>
    } else {
      return null;
    }
  }

  setPics() {
    if (this.fileInput.current) {
      let files = this.fileInput.current.files;
      let photoUrls = [];

      for (let i = 0; i < files.length; i++) {
        photoUrls.push(<img id={ 'preview-photo' + i } src={URL.createObjectURL(files[i])}></img>);
      }

      this.setState({
        photoUrls: photoUrls,
      })
    }
  }

  render() {
    if (this.props.show) {
      return (
        <div id='modal-wrapper'>
          <div id='modal' role='modal'>
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
                    <input type='radio' id='recommend-yes' name='recommend' value='yes' onChange={ this.handleRecommendChange }></input>
                  </label>
                  <label>
                    No
                    <input type='radio' id='recommend-no' name='recommend' value='no' onChange={ this.handleRecommendChange }></input>
                  </label>
              </div>
              <div className='row'>
                <div id='form-characteristics'>
                  <h3>Characteristics</h3>

                  { this.renderCharacteristics() }

                </div>
                <div id='form-content'>
                  <h3>Review</h3>

                    <p id='p-name'>Name:</p>
                    <input id='form-name' type='text' name='name' onChange={ this.handleInputChange }></input>

                    <p id='p-email'>Email:</p>
                    <input id='form-email' type='email' name='email' onChange={ this.handleInputChange }></input> { this.emailCheck() }


                    <p id='p-summary'>Summary:</p>
                    <input id='form-summary' type='text' name='summary' onChange={ this.handleInputChange }></input>

                    <p id='p-body'>Body:</p>
                    <textarea id='form-body' type='text' name='body' onChange={ this.handleInputChange }></textarea>

                    <p id='p-file'>(Optional) Photos:</p>
                    <input id={'form-file'} onChange={ this.setPics }type='file' name='photos' ref={ this.fileInput } multiple></input>
                    <div id='form-file-preview'>
                      { this.state.photoUrls }
                    </div>
                </div>
              </div>

              { this.completeCheck() }
            <button id='form-submit' onClick={ this.handleSubmit }>Submit</button>
            </form>
            <button id='close-modal' onClick={ this.handleClose }>X</button>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default WriteReview;