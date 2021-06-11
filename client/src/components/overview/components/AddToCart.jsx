import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skus: this.props.skus,
      value: 'Select size',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.skus !== prevProps.skus) {
      this.setState({
        skus: this.props.skus,
        value: 'Select size',
      })
    }
  }

  renderSizes() {
    let optionArray = [];
    for (var key in this.state.skus) {
      if ( this.state.skus[key].quantity ) {
        let option = <option key={ this.state.skus[key].size } value={ this.state.skus[key].size }>{ this.state.skus[key].size }</option>
        optionArray.push(option);
      }
    }
    if (optionArray.length) {
      return <select onChange={ this.handleSizeChange.bind(this) } value={this.state.value} id="size-picker" name="size-picker">
              <option value="Select size">Select size</option>
              { optionArray.map((option) => { return option }) }
            </select>
    } else {
      return <select id="size-picker" name="size-picker" disabled>
              <option value="OUT OF STOCK">OUT OF STOCK</option>
             </select>
    }
  }

  renderQuantity() {
    let optionArray = [];
    for (var key in this.state.skus) {
      if (this.state.skus[key].quantity > 15) {
        let option = <option value="15">15</option>
        optionArray.push(option);
      } else {
        let option = <option value={ this.state.skus[key].quantity }>{ this.state.skus[key].quantity }</option>
        optionArray.push(option);
      }

    }
    return <select id="quantity-picker" name="quantity-picker">
             { optionArray.map((option) => { return option }) }
           </select>
  }

  handleSizeChange(e) {
    if (e.target.value !== "Select size") {
      this.setState({
        value: e.target.value,
      })
    } else {
      this.setState({
        value: "Select size",
      })
    }

  }

  render() {
    return (
      <div id="add-to-cart">
        <form>
            { this.renderSizes() }
            { this.renderQuantity() }
          <input type="submit" value="Add to Cart +" />
        </form>
      </div>
    );
  }
}

export default AddToCart;
