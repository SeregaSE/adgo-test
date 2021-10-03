import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

import {
  getBrowsers,
  getOperatingSystems,
  getPlatforms,
  getGroups,
  getStatistics
} from '../../api/api'

import './AdvertisingStatisticsTable.css'

const AdvertisingStatisticsTable = () => {

  const [groups, setGroups] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [statisticsParams, setStatisticsParams] = useState({
    groupBy: 'day',
    from: '2019-07-01',
    to: '2019-07-07',
    limit: '',
    offset: '',
    platform: '',
    browsers: [],
    operatingSystems: [],
  });

  React.useEffect(() => {

    getPlatforms().then(
      (platforms) => setPlatforms(platforms)
    );

    getBrowsers().then(
      (browsers) => setBrowsers(browsers)
    );

    getOperatingSystems().then(
      (operatingSystems) => setOperatingSystems(operatingSystems)
    );

    getGroups().then(
      (groups) => setGroups(groups)
    );

    getStatistics(statisticsParams).then(
      (statistics) => setStatistics(statistics)
    );
  }, [statisticsParams])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (date) => {
    let newDate = new Date(date),
      month = '' + (newDate.getMonth() + 1),
      day = '' + newDate.getDate(),
      year = newDate.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return [year, month, day].join('-');
}

  const handleChangeFromDate = (value) => {
    const date = formatDate(value);

    setStatisticsParams({
      ...statisticsParams,
      from: date,
    })

    getStatistics({ ...statisticsParams, from: date}).then(
      (statistics) => setStatistics(statistics)
    );
  }

  const handleChangeToDate = (value) => {
    const date = formatDate(value);

    setStatisticsParams({
      ...statisticsParams,
      to: date,
    })

    getStatistics({ ...statisticsParams, to: date}).then(
      (statistics) => setStatistics(statistics)
    );
  }

  const handleChangeGroupBy = (value) => {
    setStatisticsParams({
      ...statisticsParams,
      groupBy: value,
    })
    
    getStatistics({ ...statisticsParams, groupBy: value}).then(
      (statistics) => setStatistics(statistics)
    );
  }

  const handleChangePlatform = (value) => {
    setStatisticsParams({
      ...statisticsParams,
      platform: value,
    })
    
    getStatistics({ ...statisticsParams, platform: value}).then(
      (statistics) => setStatistics(statistics)
    );
  }

  const handleChangeOperatingSystems = (values) => {  
    setStatisticsParams({
      ...statisticsParams,
      operatingSystems: values,
    })
    
    getStatistics({ ...statisticsParams, operatingSystems: values}).then(
      (statistics) => setStatistics(statistics)
    );
  }

  const handleChangeBrowsers = (values) => {
    setStatisticsParams({
      ...statisticsParams,
      browsers: values,
    })
    
    getStatistics({ ...statisticsParams, browsers: values}).then(
      (statistics) => setStatistics(statistics)
    );
  }
  
  return (
    <div className='as-table'> 
      <div className='as-table-filters'>
        <div className='as-table-selectors'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className='as-table-selectors-dates__from-date'>
              <DatePicker
                openTo='year'
                views={['year', 'month', 'day']}
                label='From'
                value={new Date(statisticsParams.from)}
                onChange={handleChangeFromDate}
                renderInput={(params) => <TextField {...params} helperText={null} />}
              />
            </div>
            <div className='as-table-selectors-dates__from-date'>
              <DatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                label='To'
                value={new Date(statisticsParams.to)}
                onChange={handleChangeToDate}
                renderInput={(params) => <TextField {...params} helperText={null} />}
              />
            </div>
          </LocalizationProvider>
          <Selector 
            title='Group by'          
            options={groups}
            emptyItem={false}
            onChangeValue={handleChangeGroupBy}
          />
          <Selector 
            title='Platform'
            options={platforms}
            onChangeValue={handleChangePlatform}
          />
        </div>
        <div className='as-table-multiple-selectors'> 
          <MultipleSelector 
            title='Operating systems'
            options={operatingSystems}
            onChangeValues={handleChangeOperatingSystems}
          />
          <MultipleSelector 
            title='Browsers'
            options={browsers}
            onChangeValues={handleChangeBrowsers}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>
                {
                  (statisticsParams.groupBy === 'day' && 'Day') ||
                  (statisticsParams.groupBy === 'platform' && 'Platform') ||
                  (statisticsParams.groupBy === 'operatingSystem' && 'Operating system') ||
                  (statisticsParams.groupBy === 'browser' && 'Browser')
                }
              </TableCell>
              <TableCell align="center">Impressions</TableCell>
              <TableCell align="center">Conversions</TableCell>
              <TableCell align="center">Money</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='as-table-body'>
            {
              statistics.length !== 0 && 
              statistics.rows.slice(
                page * rowsPerPage, page * rowsPerPage + rowsPerPage
              ).map((row) => (
                <TableRow key={row.day || row.platform || row.operatingSystem || row.browser}>
                  <TableCell>{row.day || row.platform || row.operatingSystem || row.browser}</TableCell>
                  <TableCell align="center">{row.impressions}</TableCell>
                  <TableCell align="center">{row.clicks}</TableCell>
                  <TableCell align="center">{row.money}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        statistics.length !== 0 
        &&
          <div className='as-table-footer'>
            <div className='as-table-footer__total'>
              <h1>Total:</h1>
              <p>— Impressions: {statistics.total.impressions}</p>
              <p>— Clicks:      {statistics.total.clicks}</p>
              <p>— Money:       {statistics.total.money}</p>     
            </div>            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              className='as-table-footer__pagination'
              count={statistics.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
      }
    </div>
  )
}

const Selector = (props) => {
  const {
    title,
    options,
    emptyItem = true,
    onChangeValue,
  } = props;

  const defaultValue = options[0] ? options[0].value : '';

  const [value, setValue] = useState(defaultValue);

  const handleChangeValue = (event) => {
    const newValue = event.target.value;

    setValue(newValue)
    onChangeValue(newValue);
  };

  return (
    <Box className='as-table-selectors__selector'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          defaultValue={defaultValue}
          label={title}
          onChange={handleChangeValue}
        >
          {
            emptyItem
            &&
              <MenuItem value='' className='sas-table-selectors__selector-empty-item'></MenuItem>
          }
          {
            options.map(
              (option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              )
            ) 
          }
        </Select>
      </FormControl>
    </Box>
  )
}

const MultipleSelector = (props) => {
  const {
    title,
    options,
    onChangeValues,
  } = props;

  const [values, setValues] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    const newValues = typeof value === 'string' ? value.split(',') : value;

    setValues(newValues);

    const convertedValues = newValues.map((newValue) => (
      options.find((option) => option.label === newValue).value
    ))

    onChangeValues(convertedValues);
  };
  
  return (
    <Box className='as-table-multiple-selectors__selector'>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={values}
          label={title}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.label}>
              <Checkbox checked={values.indexOf(option.label) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default AdvertisingStatisticsTable
