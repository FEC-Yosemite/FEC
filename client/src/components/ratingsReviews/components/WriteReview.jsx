import React from 'react';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    if (this.props.show) {
      return (
        <div id='modal'>
          <div id='modal-head'>
          <h2>Write Your Review</h2>
          About the { this.props.product }
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