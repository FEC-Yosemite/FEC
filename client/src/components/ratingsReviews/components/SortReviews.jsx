import React from 'react';

class SortReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.handleChange = this.handleChange.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  handleChange(e) {
    this.props.handleSort(e.target.value);
  }

  renderSelect() {
    return (
      <select id='sort-select' onChange={ this.handleChange }>
        <option value='relevant' selected>relevance</option>
        <option value='newest'>newest</option>
        <option value='helpful'>helpfulness</option>
       </select>
    )
  }

  render() {
    return (
      <div id='sort-review'>

        <h3>{ this.props.reviews[this.props.sort].length } reviews, sorted by { this.renderSelect() }</h3>

        </div>
    )
  }
}

export default SortReviews;