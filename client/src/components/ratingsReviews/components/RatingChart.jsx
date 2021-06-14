import React from 'react';

class RatingChart extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let value = this.props.rating
    var max = 100


  }

  render() {
    return (
      <canvas id={ this.props.id }></canvas>
    )
  }
}

export default RatingChart;