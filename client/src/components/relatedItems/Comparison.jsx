import React, { Component } from 'react';

import ComparisonRow from './ComparisonRow.jsx';

class Comparison extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characteristics: null
        };
        this.showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        this.updateProductFeatures = this.updateProductFeatures.bind(this);
    };    

    componentDidMount() {
        this.updateProductFeatures();
        console.log(`state of features: ${JSON.stringify(this.state.characteristics)}`);
    }

    updateProductFeatures() {
        let temp = {};
        let current_product = JSON.parse(this.props.current_product);
        let modal_product = JSON.parse(this.props.modal_product);
        for (let i = 0; i < current_product.features.length; i++) {
            let feature = current_product.features[i].feature;
            temp[feature] = [current_product.features[i].value, null];
        }
        for (let i = 0; i < modal_product.features.length; i++) {
            let feature = modal_product.features[i].feature;
            if (temp[feature] === undefined) {
                temp[feature] = [null, null];
            }
            temp[feature][1] = modal_product.features[i].value;
        }
        console.log('TEMP: ', JSON.stringify(temp));
        this.setState({
            characteristics: JSON.stringify(temp)
        });
    }

    render() {
        return(
            <div className="modal" id={this.props.productId} className={this.showHideClassName}>
                <section id="related-products-modal-head">
                <h3>Comparing</h3>
                </section>
                <section className="modal-main">
                <table>
                    <thead>
                    <tr>
                        <td><strong>{JSON.parse(this.props.current_product).name}</strong></td>
                        <td></td>
                        <td><strong>{JSON.parse(this.props.modal_product).name}</strong></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.characteristics !== null ?
                        Object.keys(JSON.parse(this.state.characteristics)).map((feature, key) => (
                            <ComparisonRow key={key} left_data={JSON.parse(this.state.characteristics)[feature][0]} center_data={feature} right_data={JSON.parse(this.state.characteristics)[feature][1]} />
                        ))
                        :
                        null
                    }
                    </tbody>
                </table>
                </section>
                <button onClick={this.props.hideModal}>Close</button>
            </div>
        );
    }
}

export default Comparison;