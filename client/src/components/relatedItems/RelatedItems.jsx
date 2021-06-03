import React, { Component } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';

class RelatedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h3>relateditems goes here!</h3>
                <RelatedProductsList />
            </div>
        );
    }
}

export default RelatedItems;