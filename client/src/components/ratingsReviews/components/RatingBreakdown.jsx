import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { getReviewMeta } from '../../../requests.js';
import quarterStar from '../../../../pix/svgs/starquarter.svg';
import threeQuarterStar from '../../../../pix/svgs/star3quarters.svg';
import star from '../../../../pix/svgs/star.svg';
import starEmpty from '../../../../pix/svgs/star-o.svg';
import starHalf from '../../../../pix/svgs/star-half-empty.svg';
import RatingChart from './RatingChart.jsx';

// => DataUrl for file.svg


class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: {},
      avg: null,
      rec: null
    }

    this.renderChart = this.renderChart.bind(this);
  }

  renderStars() {
    let stars = [];
    let avg = this.state.avg;
    let whole = Math.floor(avg);
    let float = avg % 1;

    while (stars.length < whole) {
      stars.push(<img key={ stars.length + 'stars' } alt='solid star' src={ star }/>)
    }

    if (float > 0 && float <= 0.33) {
      stars.push(<img key={ stars.length + 'stars' } alt='quarter star' src={ quarterStar }/>)
    } else if (float > 0.33 && float <= 0.67) {
      stars.push(<img key={ stars.length + 'stars' } alt='half star' src={ starHalf }/>)
    } else if (float > 0.67 && float < 1) {
      stars.push(<img key={ stars.length + 'stars' } alt='three quarter star' src={ threeQuarterStar }/>)
    }

    while (stars.length < 5) {
      stars.push(<img key={ stars.length + 'stars' } alt='star outline' src={ starEmpty }/>)
    }


    return stars;
  }

  getRecommended(data) {
    let f = Number(data.false);
    let t = Number(data.true);

    let result = (t / (f + t)).toFixed(2);

    if (isNaN(result)) {
      return 0;
    }

    return result * 100;
  }

  getAvgRating(ratings) {
    const keys = Object.keys(ratings);
    let total = 0;
    let count = 0;
    keys.map((key) => {
      total += Number(key) * Number(ratings[key]);
      count += Number(ratings[key]);
    })
    let avg = (total / count).toFixed(1);

    if (isNaN(avg)) {
      return 0;
    }

    return avg;
  }

  renderChart() {
    let ratings = this.state.ratings;
    let data = [];
    let total = 0;
    let newRatings = { 1: '0', 2: '0', 3: '0', 4: '0', 5: '0' }

    for (let key in ratings) {
      total += Number(ratings[key]);
      newRatings[key] = ratings[key]
    }

    for (let key in newRatings) {
      data.unshift({
        name: key + ' Stars',
        count: Number(ratings[key]) || 0,
        total: total - Number(ratings[key]) || total
      })
    }

    return <RatingChart id={ 'rating-chart' } handleFilter={this.props.handleFilter } data={ data }/>
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let avg = this.getAvgRating(this.props.meta.ratings);
      let rec = this.getRecommended(this.props.meta.recommended);

      this.setState({
        ratings: this.props.meta.ratings,
        avg: avg,
        rec: rec
      })
    }
  }

  componentDidMount() {
    let avg = this.getAvgRating(this.props.meta.ratings);
    let rec = this.getRecommended(this.props.meta.recommended);

    this.setState({
      ratings: this.props.meta.ratings,
      avg: avg,
      rec: rec
    })
  }

  render() {
    return (
      <div id='rating-breakdown'>
        <h3>RATINGS {'\&'} REVIEWS</h3>
        <div id='breakdown-header'>
          <h1 id='average-rating'>{ this.state.avg }</h1>
          <div id='stars'>
              { this.renderStars() }
          </div>
        </div>
        <p id='recommend-percent'>{ this.state.rec }% of reviews recommend this product</p>
          <div id='rating-chart'>
            { this.renderChart() }
          </div>
      </div>
    )
  }
}

export default RatingBreakdown;