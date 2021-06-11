import React from 'react';
import PhotoView from './PhotoView.jsx';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { markAsHelpful, reportReview } from '../../../requests.js';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
      report: false,
      expanded: ''
    }
    this.renderStars = this.renderStars.bind(this);
    this.renderRecommend = this.renderRecommend.bind(this);
    this.renderResponse = this.renderResponse.bind(this);
    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleUnhelpful = this.handleUnhelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.closeExpanded = this.closeExpanded.bind(this);
    this.renderExpanded = this.renderExpanded.bind(this);
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
    var stars = [];
    for (var i = 0; i < review.rating; i++) {
      stars.push(<FontAwesomeIcon icon={ fasStar } />);
    }

    while (stars.length < 5) {
      stars.push(<FontAwesomeIcon icon={farStar } />);
    }

    return stars;
  }

  renderRecommend() {
    var review = this.props.review;
    if (review.recommend) {
      return (
        <div id='review-recommend'>
          <FontAwesomeIcon icon={ faCheck } /> I recommend this product
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

  handleExpand(e) {
    this.setState({
      expanded: e.target.src
    })
  }

  closeExpanded() {
    this.setState({
      expanded: ''
    })
  }

  renderExpanded() {
    if (this.state.expanded) {
      return <PhotoView url={ this.state.expanded } close={ this.closeExpanded } />
    }
  }

  render() {
    var review = this.props.review;

    return (
      <div className='review'>
        <div id='review-header'>
          <p id='review-stars'>{ this.renderStars() }</p>
          <p id='review-name'>{ review.reviewer_name }</p>
          <p id='review-date'>{ moment(review.date).format('MM / DD / YYYY') }</p>
        </div>

        <h3 id='review-summary'>{ review.summary }</h3> <br/>

        <p id='review-body'>{ review.body }</p>

        { this.renderRecommend() }

        { this.renderResponse() }

        { this.renderExpanded() }

        <div id='review-photos'>{ review.photos.map((photo) => {
          return <img onClick={ this.handleExpand } src={ photo.url }></img>
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