import React, { useState } from 'react';
import './css/App.css';

import DateInput from './components/DateInput';
import SelectInput from './components/SelectInput'
import TableContainer from './components/TableContainer';

import ApiService from './apiService/index';
import ApiServiceContext from './context/index';

const apiService = new ApiService();

const App = () => {
  const [groupBy, setGroupBy] = useState('');
  const [limit, setLimit] = useState('5');
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [platform, setPlatform] = useState('');
  const [operatingSystems, setOperatingSystem] = useState([]);
  const [browsers, setBrowser] = useState([]);
 
  return (
    <ApiServiceContext.Provider value={apiService}>
      <div className="App">
        <div className="inputs-group">
          <DateInput
            maxDate={dateTo} 
            maxDateMEssage="Choose the correct date"
            value={dateFrom} 
            setDate={d => setDateFrom(d)} 
            label="From" />
          <DateInput 
            minDate={dateFrom} 
            minDateMEssage="Choose the correct date"
            value={dateTo} 
            setDate={d => setDateTo(d)} 
            label="To" />
        </div>
        <div className="inputs-group">
          <SelectInput 
            single 
            type="groups" 
            value={groupBy} 
            onChange={setGroupBy} 
            label="Group by" />
          <SelectInput 
            single 
            type="platforms" 
            value={platform} 
            onChange={setPlatform} 
            label="Platform" />
          <SelectInput 
            single 
            value={limit} 
            onChange={setLimit} 
            label="Rows per page" 
            presetOptions={[{value: '5', label: 'Limit by 5'}, {value: '10', label: 'Limit by 10'}, {value: '15', label: 'Limit by 15'}, {value: '25', label: 'Limit by 25'}]}/>
          </div>
        <div className="inputs-group">
          <SelectInput 
            type="operating-systems" 
            selected={operatingSystems} 
            onChange={setOperatingSystem} 
            label="Operating System" />
          <SelectInput 
            type="browsers" 
            selected={browsers} 
            onChange={setBrowser} 
            label="Browser" />
        </div>
        <TableContainer 
          groupBy={groupBy} 
          from={dateFrom.toISOString().slice(0, 10)} 
          to={dateTo.toISOString().slice(0, 10)} 
          platform={platform} 
          browsers={browsers} 
          operatingSystems={operatingSystems} 
          limit={limit}/>
      </div>
    </ApiServiceContext.Provider>
  );
}

export default App;
