import React, {Component} from 'react';
import SortInputs from './components/sort-inputs/sort-inputs';
import Table from './components/table/table';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateFrom: '',
            dateTo: '',
            groupBy: '',
            platforms: '',
            os: '',
            browsers: '',
            currentPage: 0,
            selectBrowsers: [],
            selectOS: [],
            selected: {
                dateFrom: '',
                dateTo: '',
                groupBy: '',
                platforms: '',
                os: '',
                browsers: ''
            },         
            tableRows: [{day: '', impressions: '', clicks: '', money: ''}]
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchApiAndSort = this.fetchApiAndSort.bind(this);
        this.clearInputAndTable = this.clearInputAndTable.bind(this);
        this.pageChangeHandler = this.pageChangeHandler.bind(this);
        this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
    }

    componentDidMount() {
        this.fetchApiAndSetState('groups', 'groupBy')
        this.fetchApiAndSetState('platforms', 'platforms')
        this.fetchApiAndSetState('operating-systems', 'os')
        this.fetchApiAndSetState('browsers', 'browsers')
    }

    fetchApiAndSetState(url, setKey) {
        fetch(`http://localhost:3000/api/v1/${url}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({[setKey]: result})
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    fetchApiAndSort() {
        const {
            dateFrom,
            dateTo,
            groupBy,
            platforms
        } = this.state.selected

        const {
            selectBrowsers,
            selectOS
        } = this.state

        let url = `http://localhost:3000/api/v1/statistics?groupBy=${groupBy}&from=${dateFrom}&to=${dateTo}`

        if (platforms.length) {
            url += `&platform=${platforms}`
        }
        if (selectOS.length) {
            selectOS.forEach(item => {
                url += `&operatingSystems[]=${item}`
            })
        }
        if (selectBrowsers.length) {
            selectBrowsers.forEach(item => {
                url += `&browsers[]=${item}`
            })
        }
        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({tableRows: result.rows});
                },
                (error) => {
                    console.log(error)
                    alert('Error')
                }
            )
    }

    clearInputAndTable() {
        const selects = document.querySelectorAll('select')
        const dateInput = document.querySelectorAll('input')

        selects.forEach(select => {
            select.value=0
        })

        dateInput.forEach(input => {
            input.value=''
        })

        this.setState({tableRows: [{day: '', impressions: '', clicks: '', money: ''}]})
    }

    handleChangeMultiple(ev) {
        const id = ev.target.id
        console.log(id)
        const options = ev.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        if (id === 'browsers') {
            this.setState({selectBrowsers: value})
        }
        if (id === 'os') {
            this.setState({selectOS: value})
        }
        console.log(this.state)
    }

    handleChange(ev) {
        const id = ev.target.id
        const value = ev.target.value
        this.setState({selected: {...this.state.selected, [id]:value}});
    }

    pageChangeHandler({selected}) {
        this.setState({currentPage: selected})
    }

    render() {
        const tableRows = this.state.tableRows
        const pageSize = 10
        const displayData = _.chunk(tableRows, pageSize)
        [this.state.currentPage]
        const pageCount = Math.ceil(tableRows.length / pageSize)
        return (
            <div className='container'>
                <SortInputs 
                    state={this.state}
                    handleChange={this.handleChange}
                    sort={this.fetchApiAndSort}
                    clear={this.clearInputAndTable}
                    handleChangeMultiple={this.handleChangeMultiple}
                />
                <Table 
                    rows={displayData}
                />
                {
                tableRows.length > pageSize ?
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.pageChangeHandler}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    forcePage={this.state.currentPage}
                /> : null
                }
            </div>
        )
    }
}

export default App