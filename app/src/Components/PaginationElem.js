import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeOffset } from '../store/actions';
import { bindActionCreators } from 'redux';

class PaginationElem extends Component {
    _isMounted = false;
    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    changePage = (e) =>{
        e.preventDefault();
        if(this._isMounted){
            this.props.changeOffset(this.props.num);
        }
    }
    render() {
        const { num, offset } = this.props;
        return (
        <li className="page-item">
            <button className={
                        num === offset[0]
                        ?
                        "btn btn-dark"
                        :
                        "btn btn-outline-dark"
                    } 
                    
                onClick={this.changePage}
                disabled={num === offset[0]}
            >
                    {num+1}
            </button>
        </li>
        )
    }
}

PaginationElem.propTypes={
    num: PropTypes.number,
    offset: PropTypes.array
}
PaginationElem.defaultProps={
    num: 0,
    offset: []
}

const mapStateProps = (state) => {
    return {
        offset: state.offset
    };
};

const mapActionToProps = (dispatch) => {
    return {
        changeOffset: bindActionCreators(changeOffset, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(PaginationElem)

