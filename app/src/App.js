import React from 'react';
import './App.css';
import DateFilter from "./components/DateFilter/DateFilter";
import AgentFilter from "./components/AgentFilter/AgentFilter";
import DataContainer from "./components/Data/DataContainer";
import PaginationContainer from "./components/Pagination/PaginationContainer";

const App = () => {
    return (
        <div className="app-wrapper">
            <div className="app">
                <div className="filterField"><DateFilter/></div>
                <div className="filterField"><AgentFilter/></div>

                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <td>Day</td>
                                <td>Impression</td>
                                <td>Conversions</td>
                                <td>Money</td>
                            </tr>
                        </thead>

                        <tbody>
                        <DataContainer/>
                        </tbody>
                    </table>
                </div>

                <PaginationContainer/>
            </div>
        </div>
    )
};

export default App;
