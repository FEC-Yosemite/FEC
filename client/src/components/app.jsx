import React from 'react';
import ReviewsList from './ratingsReviews/ReviewsList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <div>
      Hello World! Test
      <ReviewsList />
    </div>
    )
  }
}

export default App;