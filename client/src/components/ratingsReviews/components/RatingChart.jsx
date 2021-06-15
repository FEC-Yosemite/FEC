import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList
} from "recharts";

class RatingChart extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let val = Number(e.value.slice(0, 1));
    this.props.handleFilter(val);
  }

  render() {
    let data = this.props.data;
    return (
      <div className="content c-white">
        <ResponsiveContainer height={ 150 } width={ "100%" }>
          <BarChart
            layout="vertical"
            data={ data }
            stackOffset="expand"
          >
            <XAxis hide type="number" />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#000000"
              fontSize="18"
              onClick={ this.handleClick }
            />
            <Bar dataKey="count" fill="#1A5F1C" stackId="a">
            </Bar>
            <Bar isAnimationActive={false} dataKey="total" fill="#CDCDCD" stackId="a">
              <LabelList dataKey='count' position='insideRight'/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default RatingChart;