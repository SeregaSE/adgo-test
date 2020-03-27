import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'

import Table from '../containers/TableContainer'

import store from '../store/store'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
            <Router>
            <div className="wrap">
                <Table />
            </div>
            </Router>
            </Provider>
        )
    }
}

export default App