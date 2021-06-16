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
      expanded: '',
      more: false
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
    this.renderBody = this.renderBody.bind(this);
    this.handleMore = this.handleMore.bind(this);
  }

  handleHelpful(e) {
    var review = this.props.review;
    this.props.interact(e.target.outerHTML, 'ratings&reviews')
    if (!this.state.helpful) {
      markAsHelpful(review.review_id)
      this.setState({
        helpful: true
      });
      review.helpfulness += 1;
      e.target.classList.add('clicked')
    }
  }

  handleUnhelpful(e) {
    if (!this.state.helpful) {
      this.setState({
        helpful: true
      })
      e.target.classList.add('clicked')
    }
  }

  handleReport(e) {
    if (!this.state.report) {
      reportReview(this.props.review.review_id)
      this.setState({
        report: true
      })
      e.target.classList.add('clicked')
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
          <b>Response:</b> <br/>
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

  handleMore() {
    this.setState({
      more: true
    })
  }

  renderBody() {
    let body = this.props.review.body;

    if (body.length > 250) {
      if (this.state.more) {
        return body
      }
      if (!this.state.more) {
        return ([
          body.slice(0, 251),
          <br></br>,
          <button id='see-more' onClick={ this.handleMore }>See more...</button>
        ])
      }
    } else {
      return body;
    }
  }

  render() {
    let review = this.props.review;

    return (
      <div className='review'>
        <div id='review-header'>
          <p id='review-stars'>{ this.renderStars() }</p>
          <p id='review-name'>{ review.reviewer_name }</p>
          <p id='review-date'>{ moment(review.date).format('MM / DD / YYYY') }</p>
        </div>

        <h3 id='review-summary'>{ review.summary }</h3> <br/>

        <p id='review-body'>{ this.renderBody() }</p>

        { this.renderRecommend() }

        { this.renderResponse() }

        { this.renderExpanded() }

        <div id='review-photos'>{ review.photos.map((photo) => {
          return <img onClick={ this.handleExpand } src={ photo.url }></img>
        })} </div><br/>

        <p id='review-helpful'>Was this review helpful?
        <button className='helpful' onClick={ this.handleHelpful }>Yes</button>({ review.helpfulness })
        <button className='unhelpful' onClick={ this.handleUnhelpful }>No</button> |
        <button className='report' onClick={ this.handleReport }>Report</button></p>
      </div>
    )
  }
}

export default Review;