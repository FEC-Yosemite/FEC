import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skus: this.props.skus,
      selectedSize: 'Select size',
      selectedQuantity: '-',
      currentSku: '',
      sizeNotSelected: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.skus !== prevProps.skus) {
      this.setState({
        skus: this.props.skus,
        selectedSize: 'Select size',
        currentSku: '',
      })
    }
  }

  renderSizes() {
    let optionArray = [];
    for (let key in this.state.skus) {
      if ( this.state.skus[key].quantity ) {
        let skuNum = key;
        let option = <option data-sku={ skuNum } key={ this.state.skus[key].size } value={ this.state.skus[key].size }>{ this.state.skus[key].size }</option>
        optionArray.push(option);
      }
    }
    if (optionArray.length) {
      return <select onChange={ this.handleSizeChange.bind(this) } value={this.state.selectedSize} id="size-picker" name="size-picker">
              <option value="Select size">Select size</option>
              { optionArray.map((option) => { return option }) }
            </select>
    } else {
      return <select id="size-picker-disabled" name="size-picker-disabled" value="OUT OF STOCK" disabled>
              <option value="OUT OF STOCK">OUT OF STOCK</option>
             </select>
    }
  }

  renderQuantity() {
    let optionArray = [];
    for (let key in this.state.skus) {
      if (key === this.state.currentSku) {
        if (this.state.skus[key].quantity > 15) {
          for (let i = 1; i <= 15; i++) {
            let option = <option value={i}>{i}</option>
            optionArray.push(option);
          }
        } else {
          for (let i = 1; i <= this.state.skus[key].quantity; i++) {
            let option = <option value={i}>{i}</option>
            optionArray.push(option);
          }
        }
      }
    }
    if (this.state.selectedSize === 'Select size') {
      return <select id="quantity-picker" name="quantity-picker" disabled>
        <option value="-">-</option>
      </select>
    } else {
      return <select onChange={ this.handleQuantityChange.bind(this) } id="quantity-picker" name="quantity-picker" value={ this.state.selectedQuantity } defaultValue={'1'}>
             { optionArray.map((option) => { return option }) }
           </select>
    }
  }

  handleSizeChange(e) {
    if (e.target.value !== 'Select size') this.setState({ sizeNotSelected: false })
    let sizes = e.target.children;
    let sku;
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i].getAttribute('value') === e.target.value) {
        sku = sizes[i].getAttribute('data-sku');
      }
    }

    this.setState({
      selectedSize: e.target.value,
      currentSku: sku,
      selectedQuantity: '1',
    })
  }

  handleQuantityChange(e) {
    this.setState({
      selectedQuantity: e.target.value,
    })
  }

  handleAddToCart(e) {
    e.preventDefault();
    if (this.state.selectedSize === 'Select size') {
      this.setState({ sizeNotSelected: true })
    } else {
      this.setState({ sizeNotSelected: false })
      for (let i = 0; i < this.state.selectedQuantity; i++) {
        this.props.addToCart(Number(this.state.currentSku));
      }
    }
  }

  render() {
    return (
      <div id="add-to-cart">
        <form onSubmit={ this.handleAddToCart.bind(this) }>
          { this.state.sizeNotSelected && <span>Please select a size</span>}
            { this.renderSizes() }
            { this.renderQuantity() }
            {/* FIX */}
          { !(document.getElementById('size-picker-disabled')) && <input type="submit" value="Add to Cart +" /> }
        </form>
      </div>
    );
  }
}

export default AddToCart;
