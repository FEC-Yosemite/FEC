import React from 'react';
import { markAsHelpful, reportReview } from '../../../requests.js';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
      report: false
    }
    this.renderStars = this.renderStars.bind(this);
    this.renderRecommend = this.renderRecommend.bind(this);
    this.renderResponse = this.renderResponse.bind(this);
    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleUnhelpful = this.handleUnhelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleHelpful(e) {
    var review = this.props.review;
    if (!this.state.helpful) {
      markAsHelpful(review.review_id)
      this.setState({
        helpful: true
      });
      review.helpfulness += 1;
      document.getElementById(e.target.id).classList.add('clicked')
    }
  }

  handleUnhelpful(e) {
    if (!this.state.helpful) {
      this.setState({
        helpful: true
      })
      document.getElementById(e.target.id).classList.add('clicked')
    }
  }

  handleReport(e) {
    if (!this.state.report) {
      reportReview(this.props.review.review_id)
      this.setState({
        report: true
      })
      document.getElementById(e.target.id).classList.add('clicked')
    }
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

        <p id='review-helpful'>Was this review helpful?
        <button id='helpful' onClick={ this.handleHelpful }>Yes</button>({ review.helpfulness })
        <button id='unhelpful' onClick={ this.handleUnhelpful }>No</button> |
        <button id='report' onClick={ this.handleReport }>Report</button></p>
      </div>
    )
  }
}

export default Review;