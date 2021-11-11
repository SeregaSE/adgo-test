
import { Table } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';
import PostService from './Api/PostService.js';
import './App.css';
import 'antd/dist/antd.css';
import Browsers from './browsers/browsers.js';
import Platform from './platform/platform.js';
import Dates from './dates/dates.js';
import GroupBy from './groupBy/groupBy.js';

const os = ['Windows',
  'Mac OS',
  'Linux',
  'Android',
  'IOS',
]

function App() {
  const [allBrowsers, setAllBrowsers] = useState([])
  const [browsers, setBrowsers] = useState(null)
  const [operatingSystems, setOperatingSystems] = useState(null)
  const [platform, setPlatform] = useState(null)
  const [selectedDateStart, setSelectedDateStart] = useState(null)
  const [selectedDateEnd, setSelectedDateEnd] = useState(new window.Date())
  const [groupBy, setGroupBy] = useState(null)



  const handleBrowserChange = useCallback((value) => {
    debugger
    if (isNaN(Number.parseInt(value))) {
      return setBrowsers(undefined)
    }

    setBrowsers(value)
  })

  const handleOSChange = useCallback((value) => {
    if (isNaN(Number.parseInt(value))) {
      return setOperatingSystems(undefined)
    }

    setOperatingSystems(value)
  })


  useEffect(async () => {
    let response
    console.log('soooqa', groupBy, selectedDateStart, selectedDateEnd, browsers, operatingSystems, platform);

    response = await PostService.getBrowserChromeMobile(groupBy, selectedDateStart, selectedDateEnd, browsers, operatingSystems, platform)

    setAllBrowsers(response.data.rows)
  }, [groupBy, selectedDateStart, selectedDateEnd, browsers, operatingSystems, platform])

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await PostService.getAll()
  //     setAllBrowsers(response.data.rows)
  //   }
  //   fetchData()
  // }, [])

  // useEffect(async () => {
  //   let response
  //   console.log('soooqa', browsers, operatingSystems);
  //   if (!(browsers && operatingSystems)) {
  //     response = await PostService.getAll()
  //   } else {
  //     response = await PostService.getBrowserChromeMobile(browsers, operatingSystems)
  //   }

  //   setAllBrowsers(response.data.rows)
  // }, [browsers, operatingSystems])


  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'key'
    },
    {
      title: 'Impressions',
      dataIndex: 'impressions',
      key: 'key'
    },
    {
      title: 'Money',
      dataIndex: 'money',
      key: 'key'
    }
  ]

  function funcOperation(e) {
    handleOSChange(e.target.value)
  }

  return (
    <div>
      <div className='Group'>

        <Dates
          selectedDateStart={selectedDateStart}
          setSelectedDateStart={setSelectedDateStart}
          selectedDateEnd={selectedDateEnd}
          setSelectedDateEnd={setSelectedDateEnd}
        />
        <div className='main'>
          <p className='groupBy'>groupBy</p>
          <GroupBy setGroupBy={setGroupBy} />
        </div>
        <div className='Browsers'>
          <p>Browsers</p>
          <Browsers
            setAllBrowsers={handleBrowserChange}
            setBrowsers={setBrowsers}
          />
        </div>
        <div className='operate'>
          <Platform setPlatform={setPlatform} />
        </div>
        </div>
        <div className='platform'>
          <p>operating systems</p>
          <select onChange={funcOperation} id="selectid1">
            <option></option>
            {os.map((v, i) => <option value={++i}>{v}</option>)}
          </select>
        </div>
      <div className='table'>
      <Table
        dataSource={allBrowsers}
        columns={columns}></Table>
        </div>
    </div>
  );
}

export default App;
