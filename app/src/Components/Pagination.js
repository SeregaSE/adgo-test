import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginationElem from './PaginationElem';
import { connect } from 'react-redux';
import { increaseOffset, reduceOffset } from '../store/actions';
import { bindActionCreators } from 'redux';
import { makeArray } from '../constants';

class Pagination extends Component {
    constructor(props){
        super(props)
        this.state={
            count:this.props.count,
            offset:this.props.offset[0],
            pageCount:makeArray(this.props.count)
        }
    }
    increase = () => {
        let maxOffset = Math.floor(this.state.count/25);
        if(this.state.offset>=0&&this.state.offset<maxOffset){
            this.props.increaseOffset();
        }
    }
    reduce = () => {
        let maxOffset = Math.floor(this.state.count/25);
        if(this.state.offset>0&&this.state.offset<=maxOffset){
            this.props.reduceOffset();
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.count !== nextProps.count){
            return{
                count:nextProps.count,
                pageCount:makeArray(nextProps.count)
            }
        }
        if(prevState.offset[0] !== nextProps.offset[0]){
            return{
                offset:nextProps.offset[0]
            }
        }
        return null 
    }
    change
    render() {
        const { pageCount, offset } = this.state;
        return (
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button className="btn btn-outline-dark" aria-label="Previous" onClick={this.reduce}>
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {
                pageCount.map( page => (
                    <PaginationElem key={page} num={page} offset={offset} />
                ))
                }
                <li className="page-item">
                    <button className="btn btn-outline-dark" aria-label="Next" onClick={this.increase}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
          </ul>
        )
    }
}

Pagination.propTypes={
    count: PropTypes.number,
    increaseOffset: PropTypes.func,
    reduceOffset: PropTypes.func,
    changeOffset: PropTypes.func,
    offset: PropTypes.array
}
Pagination.defaultProps={
    count: 0,
    increaseOffset: () => {},
    reduceOffset: () => {},
    changeOffset: () => {},
    offset: []
}

const mapStateProps = (state) => {
    return {
        offset: state.offset
    };
};

const mapActionToProps = (dispatch) => {
    return {
        increaseOffset: bindActionCreators(increaseOffset, dispatch),
        reduceOffset: bindActionCreators(reduceOffset, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Pagination)


