import React, {useEffect, useState} from 'react';
import SelectComponent from './components/SelectComponent'
import DatePickers from './components/SelectComponentDate'
import ResultTable from './components/ResultTable'
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [groups, setGroups] = useState([]);

  const [isStarted, setIsStarted] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [groupBy, setGroupBy] = useState('day');
  const [dateFrom, setDateFrom] = useState('2019-07-01');
  const [dateTo, setDateTo] = useState('2019-07-07');
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [filterPlatform, setFilterPlatform] = useState('');
  const [filterBrowsers, setFilterBrowsers] = useState('');
  const [filterOperatingSystems, setFilterOperatingSystems] = useState('');

  useEffect(()=>{
    fetch('http://localhost:3000/api/v1/platforms')
      .then(response => response.json())
      .then(data => {
          setPlatforms(data);
      })
      fetch('http://localhost:3000/api/v1/browsers')
      .then(response => response.json())
      .then(data => {
        setBrowsers(data);
      })
      fetch('http://localhost:3000/api/v1/operating-systems')
      .then(response => response.json())
      .then(data => {
        setOperatingSystems(data);
      })
      fetch('http://localhost:3000/api/v1/groups')
      .then(response => response.json())
      .then(data => {
        setGroups(data);
      })
  }, [])
  
  const handleDateFrom = (e)=>{
    setDateFrom(e.target.value)
  }
  const handleDateTo = (e)=>{
    setDateTo(e.target.value)
  }
  const handleGroupBy = (e) =>{
    setGroupBy(e.target.value)
  }
  const handleFilterBowser = (e) =>{
    setFilterBrowsers(`&browsers[]=${e.target.value}`)
  }
  const handleFilterPlatform = (e) =>{
    setFilterPlatform(`&platform=${e.target.value}`)
  }
  const handleFilterOperatingSystems = (e) =>{
    setFilterOperatingSystems(`&operatingSystems[]=${e.target.value}`)
  }

  useEffect(()=>{
    fetch(`http://localhost:3000/api/v1/statistics?groupBy=${groupBy}&from=${dateFrom}&to=${dateTo}&offset=${offset}&limit=${limit}${filterBrowsers}${filterPlatform}${filterOperatingSystems}`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
         if (!data.rows[0]) setIsReceived(false)
         else {
          setData(data);
          setIsReceived(true)
          setIsStarted(true)
         }
      })
  }, [groupBy, dateFrom, dateTo, offset, limit, filterBrowsers, filterPlatform, filterOperatingSystems])

  

  return (
    <div className="App">
      <div className="area">
      <DatePickers value={dateFrom} label="From" onChange={handleDateFrom}/>
      <DatePickers value={dateTo} label="To" onChange={handleDateTo}/>
      <SelectComponent items={groups} title="Сгруппировать" default='day' onChange={handleGroupBy} />
      </div>
      <div className="area">
      <SelectComponent items={platforms} title="Платформы" onChange={handleFilterPlatform}/>
      <SelectComponent items={browsers} title="Браузеры" onChange={handleFilterBowser}/>
      <SelectComponent items={operatingSystems} title="ОС" onChange={handleFilterOperatingSystems}/>
      </div>
      
      {isStarted &&
      (<div className="TableContainer" >
      <ResultTable 
        isReceived={isReceived}
        data={data} 
        group={groupBy} 
        limit={limit} 
        setLimit={setLimit} 
        offset={offset}
        setOffset={setOffset}
        />
        </div>)
        }
    </div>
  );
}

export default App;
