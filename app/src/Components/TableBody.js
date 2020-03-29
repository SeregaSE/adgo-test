import React, { Component } from 'react';
import Row from './Row';
import PropTypes from 'prop-types';

export default class TableBody extends Component {
    constructor(props){
        super(props);
        this.state={
            data:this.props.rows,
            total:this.props.total
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.data !== nextProps.rows){
            return{
                data:nextProps.rows
            }
        }
        if(prevState.total !== nextProps.total){
            return{
                total:nextProps.total
            }
        }
        return null
    }
    render() {
        const { data } = this.state;
        return (
            <tbody>
            {data
            ?
                data.map((row, index) => (
                    <Row key={index} row={row} groupBy={this.props.groupBy}/>
                ))
            :null}
            <tr>
                <td><b>Total:</b></td>
                <td><b>{this.props.total.impressions}</b></td>
                <td><b>{this.props.total.clicks}</b></td>
                <td><b>{this.props.total.money}</b></td>
            </tr>
            </tbody>
        )
    }
}
TableBody.propTypes={
    rows: PropTypes.array.isRequired,
    total:PropTypes.object
}
TableBody.defaultProps={
    rows: [],
    total:{}
}
