import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DatePicker, Select, Table, Pagination, Timeline, Spin } from 'antd';
import moment from 'moment';
import {
    getPlatformsList,
    getOperatingList,
    getBrowserList,
    getGroupsList,
    getStatictics,
    handleSetActivePlatforms,
    handleSetActiveOperating,
    handleSetActiveBrowser,
    handleSetActiveGroups
} from './redux/actions/actionCreater';

function App() {
    const dispatch = useDispatch();

    const platforms = useSelector(state => state.elem.platforms);
    const activePlatform = useSelector(state => state.elem.activePlatform);

    const operatingSystems = useSelector(state => state.elem.operatingSystems);
    const activeOperatingSystems = useSelector(state => state.elem.activeOperatingSystems);

    const browser = useSelector(state => state.elem.browser);
    const activeBrowser = useSelector(state => state.elem.activeBrowser);

    const groups = useSelector(state => state.elem.groups);
    const activeGroups = useSelector(state => state.elem.activeGroups);

    const dataSource = useSelector(state => state.elem.statistics);
    const count = useSelector(state => state.elem.count);
    const total = useSelector(state => state.elem.total);
    const loading = useSelector(state => state.elem.loading);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getPlatformsList());
        dispatch(getOperatingList());
        dispatch(getBrowserList());
        dispatch(getGroupsList());
    }, [dispatch]);

    useEffect(() => {
        // исходя из описания api, поля (groupBy, from, to) - обязательны. Добавил условие. 
        if (activeGroups && dateFrom && dateTo) {
            dispatch(getStatictics(
                activePlatform,
                activeOperatingSystems,
                activeBrowser,
                activeGroups,
                dateFrom,
                dateTo,
                currentPage
            ));
        }
    }, [activePlatform, activeOperatingSystems, activeBrowser, activeGroups, dateFrom, dateTo, currentPage, dispatch])

    let onChangeFrom = (_, dateString) => setDateFrom(dateString);

    let onChangeTo = (_, dateString) => setDateTo(dateString);

    let handleChangeGroup = (value) => dispatch(handleSetActiveGroups(value));

    let handleChangePlatform = (value) => dispatch(handleSetActivePlatforms(value));

    let handleChangeOperating = (value) => dispatch(handleSetActiveOperating(value));

    let handleChangeBrowser = (value) => dispatch(handleSetActiveBrowser(value));

    let onChangePagination = (page) => setCurrentPage(page);

    // запрет на выбор не наступившей даты, ведь по ней еще нет статистики.
    let disabledDate = (current) => current && current > moment().endOf('day');

    // определние текущего фильтра "Group by", для отображения актуального столбца в таблице анализа.
    const getValueGroup = (groupBy) => {
        let title = '';
        let dataIndex = '';
        if (groupBy && groupBy === 'day') {
            title = 'Day';
            dataIndex = 'day';
        }
        if (groupBy && groupBy === 'platform') {
            title = 'Platform';
            dataIndex = 'platform';
        }
        if (groupBy && groupBy === 'operatingSystem') {
            title = 'Oprating Systems';
            dataIndex = 'operatingSystem';
        }
        if (groupBy && groupBy === 'browser') {
            title = 'Browser';
            dataIndex = 'browser';
        }
        return { title, dataIndex }
    }
    
    const columns = [
        {
            title: getValueGroup(activeGroups).title,
            dataIndex: getValueGroup(activeGroups).dataIndex,
            key: '1'
        },
        {
            title: 'Imporessions',
            dataIndex: 'impressions',
            key: '2'
        },
        {
            title: 'Conversions',
            dataIndex: 'clicks',
            key: '3'
        },
        {
            title: 'Money',
            dataIndex: 'money',
            key: '4'
        }
    ];
    return (
        <div className="App">
            <div className="block_date">
                <ul>
                    <li>
                        <span>From</span>
                        <DatePicker onChange={onChangeFrom} disabledDate={disabledDate} disabled={loading} /></li>
                    <li>
                        <span>To</span>
                        <DatePicker onChange={onChangeTo} disabledDate={disabledDate} disabled={loading} /></li>
                    <li>
                        <span>Group by</span>
                        {groups && groups.length > 0 &&
                            <Select
                                defaultValue={groups[0].label}
                                onChange={handleChangeGroup}
                                disabled={loading}
                            >
                                {
                                    groups.map(elem => {
                                        return <Select.Option key={elem.value} value={elem.value}>{elem.label}</Select.Option>
                                    })
                                }
                            </Select>
                        }
                    </li>
                </ul>
            </div>
            <div className="block_platform">
                <ul>
                    <li>
                        <span>Platform</span>
                        {platforms && platforms.length > 0 &&
                            <Select
                                placeholder="Select Platform"
                                onChange={handleChangePlatform}
                                disabled={loading}
                            >
                                {
                                    platforms.map((elem) => {
                                        return <Select.Option key={elem.value} value={elem.value}>{elem.label}</Select.Option>
                                    })
                                }
                            </Select>
                        }
                    </li>
                    <li>
                        <span>Operating System</span>
                        {operatingSystems && operatingSystems.length > 0 &&
                            <Select
                                onChange={handleChangeOperating}
                                placeholder="Select Operating System"
                                mode="multiple"
                                maxTagCount='responsive'
                                showArrow={true}
                                disabled={loading}
                            >
                                {
                                    operatingSystems.map(elem => {
                                        return <Select.Option key={elem.value} value={elem.value}>{elem.label}</Select.Option >
                                    })
                                }
                            </Select>
                        }
                    </li>
                    <li>
                        <span>Browser</span>
                        {browser && browser.length > 0 &&
                            <Select
                                placeholder="Select Browser"
                                onChange={handleChangeBrowser}
                                mode="multiple"
                                maxTagCount='responsive'
                                showArrow={true}
                                disabled={loading}
                            >
                                {
                                    browser.map(elem => {
                                        return <Select.Option key={elem.value} value={elem.value}>{elem.label}</Select.Option >
                                    })
                                }
                            </Select>
                        }

                    </li>
                </ul>
            </div>
            <div className="table_analysis">
                <Table
                    dataSource={dataSource ? dataSource : ''}
                    columns={columns}
                    bordered
                    pagination={false}
                    rowKey='id'
                />
                {total &&
                    <>
                        <Pagination
                            defaultPageSize={25}
                            current={currentPage}
                            total={count}
                            style={{ alignSelf: 'end', marginTop: 15 }}
                            onChange={onChangePagination}
                            showSizeChanger={false}
                        />

                        <Timeline className="time_line">
                            <Timeline.Item>Общее количество переходов: <span>{total.clicks}</span></Timeline.Item>
                            <Timeline.Item>Общее денежное вознаграждение: <span>{total.money}</span></Timeline.Item>
                        </Timeline>
                    </>
                }
            </div>

            {loading &&
                <div className="spin">
                    <Spin>
                        <div style={{ marginTop: 40 }}><span>Идет загрузка...</span></div>
                    </Spin>
                </div>
            }
        </div>
    );
}

export default App;
