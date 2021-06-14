import React from 'react';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.renderCharacteristics = this.renderCharacteristics.bind(this);
  }

  renderSize() {
    return (
      <div className='chart'>
        <h3>Size</h3>
        <canvas id='size-chart'></canvas>
        <div>
          <p className='lowest'>A size too small</p>
          <p className='perfect'>Perfect</p>
          <p className='highest'>A size too big</p>
        </div>
      </div>
    )
  }

  renderWidth() {
    return (
      <div className='chart'>
        <h3>Width</h3>
        <canvas id='width-chart'></canvas>
        <div>
          <p className='lowest'>Too narrow</p>
          <p className='perfect'>Perfect</p>
          <p className='highest'>Too wide</p>
        </div>

      </div>
    )
  }

  renderComfort() {
    return (
      <div className='chart'>
        <h3>Comfort</h3>
        <canvas id='comfort-chart'></canvas>
        <div>
          <p className='lowest'>Uncomfortable</p>
          <p className='highest'>Perfect</p>
        </div>

      </div>
    )
  }

  renderQuality() {
    return (
      <div className='chart'>
        <h3>Quality</h3>
        <canvas id='quality-chart'></canvas>
        <div>
          <p className='lowest'>Poor</p>
          <p className='highest'>Perfect</p>
        </div>

      </div>
    )
  }

  renderLength() {
    return (
      <div className='chart'>
        <h3>Length</h3>
        <canvas id='length-chart'></canvas>
        <div>
          <p className='lowest'>Runs short</p>
          <p className='perfect'>Perfect</p>
          <p className='highest'>Runs long</p>
        </div>

      </div>
    )
  }

  renderFit() {
    return (
      <div className='chart'>
        <h3>Fit</h3>
        <canvas id='fit-chart'></canvas>
        <div>
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