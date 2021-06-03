import React from 'react';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';

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
      <RatingsReviews />
    </div>
    )
  }
}

export default App;