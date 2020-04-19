import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import '../styles/app.css';
import 'antd/dist/antd.css';
import {Card, DatePicker, Select, Table} from 'antd'
import moment from 'moment';
import axios from 'axios'
import {connect} from "react-redux";
import {setBrowsers, setCurrentStatistics, setGroups, setOperatingSystems, setPlatforms} from "../actions/statActions";
import SelectItems from './selectItems';

const {RangePicker} = DatePicker;
const {Option} = Select;
const columns = [
    {
        title: 'Day',
        dataIndex: 'day',
        key: 'day',
    },
    {
        title: 'Impressions',
        dataIndex: 'impressions',
        key: 'impressions',
    },
    {
        title: 'Conversions',
        dataIndex: 'clicks',
        key: 'clicks',
    },
    {
        title: 'Money',
        dataIndex: 'money',
        key: 'money',
    },
];

const App = (props) => {

    App.propTypes = {
        browsers: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            platform: PropTypes.number,
            value: PropTypes.number,
        })),
        currentStatistics: PropTypes.arrayOf(PropTypes.shape({
            clicks: PropTypes.number,
            day: PropTypes.string,
            impressions: PropTypes.number,
            money: PropTypes.number,
        })),
        groups: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })),
        operatingSystems: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            platform: PropTypes.number,
            value: PropTypes.number,
        })),
        platforms: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
        })),
    };

    const [currentDateFrom, setCurrentDateFrom] = useState(moment());
    const [currentDateTo, setCurrentDateTo] = useState(moment());
    const [currentGroup, setCurrentGroup] = useState(null);
    const [currentPlatform, setCurrentPlatform] = useState(null);
    const [currentBrowser, setCurrentBrowser] = useState(null);
    const [currentOS, setCurrentOS] = useState(null);

    const onChangeDates = (dates) => {
        setCurrentDateFrom(dates[0]);
        setCurrentDateTo(dates[1]);
    };

    const handleChangeGroups = (value) => {
        setCurrentGroup(value);
        columns[0] = {
            title: value.charAt(0).toUpperCase() + value.slice(1),
            dataIndex: value,
            key: value,
        }
    };

    const handleChangePlatforms = (value) => {
        setCurrentPlatform(value);
    };

    const handleChangeOS = (value) => {
        setCurrentOS(value)
    };

    const handleChangeBrowsers = (value) => {
        setCurrentBrowser(value);
    };

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get("http://localhost:3000/api/v1/groups");
                const groups = response.data;
                props.setGroupBy(groups);
                setCurrentGroup(groups[0].value);

                response = await axios.get("http://localhost:3000/api/v1/platforms");
                const platforms = response.data;
                props.setPlatforms(platforms);
                setCurrentPlatform(platforms[0].value);

                response = await axios.get("http://localhost:3000/api/v1/operating-systems");
                const operatingSystem = response.data;
                props.setOperatingSystem(operatingSystem);
                setCurrentOS(operatingSystem[0].value);

                response = await axios.get("http://localhost:3000/api/v1/browsers");
                const browsers = response.data;
                props.setBrowser(browsers);
                setCurrentBrowser(browsers[0].value);

            } catch (e) {
                throw new Error("Try Again");
            }
        }).call();

    }, []);

    useEffect(() => {
        if (currentPlatform && currentOS && currentGroup && currentBrowser) {
            (async () => {
                try {
                    const limit = (currentGroup === "day") ? `&limit=${currentDateTo.diff(currentDateFrom, 'days') + 1}` : "";
                    let response = await axios.get(`http://localhost:3000/api/v1/statistics?` +
                        `groupBy=${currentGroup}&` +
                        `from=${currentDateFrom.format("YYYY-MM-DD")}&` +
                        `to=${currentDateTo.format("YYYY-MM-DD")}&` +
                        `platform=${currentPlatform}&` +
                        `operatingSystems=${currentOS}&` +
                        `browsers=${currentBrowser}` + limit);
                    const tableData = response.data.rows;
                    props.setCurrentStatistics(tableData);
                } catch (e) {
                    console.log(e);
                    throw new Error("Bad response");
                }
            }).call();
        }
    }, [currentDateFrom, currentDateTo, currentBrowser, currentGroup, currentOS, currentPlatform]);

    return (
        <div className="App">
            <Card title="adgo-test - Isaev Sergey (2020)" bordered={true} className="statistics">
                <Card bordered={true}>
                    <div className="statistics__options">
                        <div className="statistics__options-row">
                            <div className="statistics__options-row-element_margin">
                                <div><b>Date</b></div>
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    defaultValue={[currentDateFrom, currentDateTo]}
                                    format={"DD-MM-YYYY"}
                                    onChange={onChangeDates}
                                    style={{marginLeft: 10}}
                                />
                            </div>
                            <div className="statistics__options-row-element_margin">
                                <div><b>Group By</b></div>
                                <SelectItems values={props.groups} onChange={handleChangeGroups}/>
                            </div>
                        </div>

                        <div className="statistics__options-row">
                            <div className="statistics__options-row-element_margin">
                                <div><b>Platforms</b></div>
                                <SelectItems values={props.platforms} onChange={handleChangePlatforms}/>
                            </div>
                            <div className="statistics__options-row-element_margin">
                                <div><b>Operating System</b></div>
                                <SelectItems values={props.operatingSystems} onChange={handleChangeOS}/>
                            </div>
                            <div className="statistics__options-row-element_margin">
                                <div><b>Browsers</b></div>
                                <SelectItems values={props.browsers} onChange={handleChangeBrowsers}/>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card bordered={true} className="statistics__table">
                    {
                        (props.currentStatistics !== null) ?
                            <Table
                                columns={columns}
                                dataSource={props.currentStatistics.map((element, index) => {
                                    return {
                                        ...element,
                                        key: index,
                                    }
                                })}
                                bordered={true}
                            />
                            : ""
                    }
                </Card>
            </Card>
        </div>
    );
};

const mapStateToProps = store => {
    return {
        groups: store.statistic.groupsBy,
        platforms: store.statistic.platforms,
        operatingSystems: store.statistic.operatingSystems,
        browsers: store.statistic.browsers,
        currentStatistics: store.statistic.currentStatistics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setGroupBy: groups => dispatch(setGroups(groups)),
        setPlatforms: platform => dispatch(setPlatforms(platform)),
        setOperatingSystem: operatingSystem => dispatch(setOperatingSystems(operatingSystem)),
        setBrowser: browser => dispatch(setBrowsers(browser)),
        setCurrentStatistics: statistics => dispatch(setCurrentStatistics(statistics))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
