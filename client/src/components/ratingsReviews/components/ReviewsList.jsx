import React from 'react';
import { getProducts } from '../../../requests.js';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    getProducts()
      .then((data) => {
        this.setState({
          products: data
        })
      })
      .then(() => console.log(this.state))
  }

  render() {
    return (
      <div id='reviews-list'>Reviews List</div>
    )
  }
}

export default ReviewsList;