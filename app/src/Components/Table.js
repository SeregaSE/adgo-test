import React, { Component } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Base_Path, getStatistics, getDifference } from '../constants';

class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            dateFrom:'',
            dateTo:'',
            groupBy:'day',
            platform:'',
            OS:'',
            browser:'',
            data:[]
        }
    }
    _getData(url){
        fetch(url)
                .then(res => res.json())
                .then(data => this.setState({
                    data:data
                }))
                .catch(err => console.log(err))
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.dateFrom !== nextProps.dateFrom){
            return{
                dateFrom: nextProps.dateFrom
            }
        }
        if(prevState.dateTo !== nextProps.dateTo){
            return{
                dateTo: nextProps.dateTo
            }
        }
        if(prevState.groupBy !== nextProps.groupBy){
            return{
                groupBy: nextProps.groupBy
            }
        }
        return null
    }
    componentDidUpdate(prevProps) {
        if(prevProps.dateFrom !== this.props.dateFrom || 
            prevProps.dateTo !== this.props.dateTo || 
            prevProps.groupBy !== this.props.groupBy ||
            prevProps.platform !== this.props.platform ||
            prevProps.OS !== this.props.OS ||
            prevProps.browser !== this.props.browser||
            prevProps.offset !== this.props.offset){
            this._getData(`${Base_Path}${getStatistics}${this.props.groupBy}&${this.props.platform?`platform=${this.props.platform}&`:''}${this.props.browser?`browsers[]=${this.props.browser}&`:''}${this.props.OS?`operatingSystems[]=${this.props.OS}&`:''}&offset=${this.props.offset[0]}&from=${this.props.dateFrom}&to=${this.props.dateTo}`);
        }
    }
    render() {
        const { rows, total, count } = this.state.data;
        const { groupBy, offset, dateFrom, dateTo } = this.state
        let diff = getDifference(dateFrom, dateTo);
        return (
            <div className="table-container">
                <table className="table table-sm">                    
                    {diff<365
                    ?
                    <>
                    <TableHeader groupBy={groupBy}/>
                    <TableBody rows={rows} groupBy={groupBy} total={total}/>
                    </>
                    :
                    <thead>
                        <tr>
                            <th>Maximum period must be less than 365 days</th>
                        </tr>
                    </thead>
                    }
                </table>
                {count>24
                ?
                <Pagination count={count} increaseOffset={this.increaseOffset} reduceOffset={this.reduceOffset} offset={offset}/>
                :null
                }
            </div>
        )
    }
    componentDidMount(){
        const { dateFrom, dateTo } = this.props ;
        this._getData(`${Base_Path}${getStatistics}day&from=${dateFrom}&to=${dateTo}`);
    }
}
Table.propTypes={
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    groupBy: PropTypes.string, 
    platform: PropTypes.string,
    OS: PropTypes.string,
    browser: PropTypes.string
}
Table.defaultProps={
    dateFrom: '2019-08-09',
    dateTo: '2019-08-10',
    groupBy: 'day', 
    platform: '',
    OS: '',
    browser: ''
}

const mapStateProps = (state) => {
    return {
        offset: state.offset
    };
};

export default connect(mapStateProps)(Table)
