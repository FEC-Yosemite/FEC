import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.renderCharacteristics = this.renderCharacteristics.bind(this);
  }

  renderSize() {
    let fit = this.props.chars.Size.value;
    let pct = (fit / 5) * 100;
    let style = {
      position: 'relative',
      left: `${pct}%`,
      transform: 'translate(-50%, -50%)'
    }
    return (
      <div className='chart' key={ 'size' + pct }>
        <h3>Size</h3>
        <div id='size-chart' className='char-div'><FontAwesomeIcon style={ style } icon={ faCaretDown } size='2x'/></div>
        <div className='char-wrapper'>
          <p className='lowest'>A size too small</p>
          <p className='perfect'>Perfect</p>
          <p className='highest'>A size too big</p>
        </div>
      </div>
    )
  }

  renderWidth() {
    let fit = this.props.chars.Width.value;
    let pct = (fit / 5) * 100;
    let style = {
      position: 'relative',
      left: `${pct}%`,
      transform: 'translate(-50%, -50%)'
    }
    return (
      <div className='chart' key={ 'width' + pct }>
        <h3>Width</h3>
        <div id='width-chart' className='char-div'><FontAwesomeIcon style={ style } icon={ faCaretDown } size='2x'/></div>
        <div className='char-wrapper'>
          <p className='lowest'>Too narrow</p>
          <p className='perfect'>Perfect</p>
          <p className='highest'>Too wide</p>
        </div>

      </div>
    )
  }

  renderComfort() {
    let fit = this.props.chars.Comfort.value;
    let pct = (fit / 5) * 100;
    let style = {
      position: 'relative',
      left: `${pct}%`,
      transform: 'translate(-50%, -50%)'
    }
    return (
      <div className='chart' key={ 'comfort' + pct }>
        <h3>Comfort</h3>
        <div id='comfort-chart' className='char-div'><FontAwesomeIcon style={ style } icon={ faCaretDown } size='2x'/></div>
        <div className='char-wrapper'>
          <p className='lowest'>Uncomfortable</p>
          <p className='highest'>Perfect</p>
        </div>

      </div>
    )
  }

  renderQuality() {
    let fit = this.props.chars.Quality.value;
    let pct = (fit / 5) * 100;
    let style = {
      position: 'relative',
      left: `${pct}%`,
      transform: 'translate(-50%, -50%)'
    }
    return (
      <div className='chart' key={ 'quality' + pct }>
        <h3>Quality</h3>
        <div id='quality-chart' className='char-div'><FontAwesomeIcon style={ style } icon={ faCaretDown } size='2x'/></div>
        <div className='char-wrapper'>
          <p className='lowest'>Poor</p>
          <p className='highest'>Perfect</p>
        </div>

      </div>
    )
  }

  renderLength() {
    let fit = this.props.chars.Length.value;
    let pct = (fit / 5) * 100;
    let style = {
      position: 'relative',
      left: `${pct}%`,
      transform: 'translate(-50%, -50%)'
    }
    return (
      <div className='chart' key={ 'length' + pct }>
        <h3>Length</h3>
        <div id='length-chart' className='char-div'><FontAwesomeIcon style={ style } icon={ faCaretDown } size='2x'/></div>
        <div className='char-wrapper'>
          <p className='lowest'>Runs short</p>
          <p className='perfect'>Perfect</p>
          <p className='highest'>Runs long</p>
        </div>

      </div>
    )
  }

  renderFit() {
    let fit = this.props.chars.Fit.value;
    let pct = (fit / 5) * 100;
    let style = {
      position: 'relative',
      left: `${pct}%`,
      transform: 'translate(-50%, -50%)'
    }
    return (
      <div className='chart' key={ 'fit' + pct }>
        <h3>Fit</h3>
        <div id='fit-chart' className='char-div'><FontAwesomeIcon style={ style } icon={ faCaretDown } size='2x'/></div>
        <div className='char-wrapper'>
          <p className='lowest'>Runs tight</p>
          <p className='perfect'>Perfect</p>
          <p className='highest'>Runs long</p>
        </div>

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

  render() {
    return (
      <div id='product-breakdown'>
        { this.renderCharacteristics() }
      </div>
    )
  }
}

export default ProductBreakdown;