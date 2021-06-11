import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="add-to-cart">
        <form>
          <select id="size-picker" name="size-picker">
            <option value="xs">xs</option>
            <option value="s">s</option>
            <option value="m">m</option>
            <option value="l">l</option>
          </select>
          <select id="quantity-picker" name="quantity-picker">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <input type="submit" value="Add to Cart +" />
        </form>
      </div>
    );
  }
}

export default AddToCart;
