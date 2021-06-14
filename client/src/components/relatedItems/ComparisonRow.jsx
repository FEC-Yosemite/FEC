import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'

class ComparisonRow extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('PROPS: ', JSON.stringify(this.props));
    }

    render() {
        return(
            <tr>
                <td>
                {this.props.left_data === null ?
                null :
                typeof this.props.left_data === 'boolean' ?
                    this.props.left_data ?
                    <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />
                :
                this.props.left_data}
                </td>
                <td>
                {this.props.center_data === null ?
                null :
                this.props.center_data}
                </td>
                <td>
                {this.props.right_data === null ?
                null :
                typeof this.props.right_data === 'boolean' ?
                    this.props.right_data ?
                    <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />
                :
                this.props.right_data}
                </td>
            </tr>
        );
    }
}

export default ComparisonRow;