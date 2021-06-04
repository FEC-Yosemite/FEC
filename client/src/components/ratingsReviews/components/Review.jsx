import React from 'react';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderStars = this.renderStars.bind(this);
    this.renderRecommend = this.renderRecommend.bind(this);
    this.renderResponse = this.renderResponse.bind(this);
  }

  renderStars() {
    var review = this.props.review;
    var stars = '';
    for (var i = 0; i < review.rating; i++) {
      stars += '*';
    }
    return stars;
  }

  renderRecommend() {
    var review = this.props.review;
    if (review.recommend) {
      return (
        <div id='review-recommend'>
          ^ I recommend this product
        </div>
      )
    }
  }

  renderResponse() {
    var review = this.props.review;
    if (review.response) {
      return (
        <div id='review-response'>
          Response: <br/>
          { review.response } <br/>
        </div>
      )
    }
  }

  render() {
    var review = this.props.review;
    console.log(review)

    return (
      <div className='review'>
        <div id='review-header'>{ this.renderStars() } { review.reviewer_name } { review.date } </div>

        <h3 id='review-summary'>{ review.summary }</h3> <br/>

        <p id='review-body'>{ review.body }</p>

        { this.renderRecommend() }

        { this.renderResponse() }

        <div id='review-photos'>{ review.photos.map((photo) => {
          return 'Photo Placeholder'
        })} </div><br/>

        <p id='review-helpful'>Was this review helpful? Yes ({ review.helpfulness }) No | Report</p>
      </div>
    )
  }
}

export default Review;