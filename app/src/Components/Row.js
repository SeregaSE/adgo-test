import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findGroup } from '../constants'

export default class Row extends Component {
    render() {
        const { impressions, clicks, money } = this.props.row;
        const group = findGroup(this.props.row, this.props.groupBy)
        return (
            <tr>
                <td>{group}</td>
                <td>{impressions}</td>
                <td>{clicks}</td>
                <td>{money}</td>
            </tr>
        )
    }
}
Row.propTypes={
    data: PropTypes.object.isRequired
}
Row.defaultProps={
    data: {}
}


