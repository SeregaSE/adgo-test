import * as React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import FilterContext from '../../../context/Filter/FilterContext'
import { FilterField } from '../../../models'

const InputDate = () => {
  const {setFilterFields, toDate, fromDate} = React.useContext(FilterContext)

  // @ts-ignore
  const handleChangeFromDate = (date) => {
    setFilterFields({fromDate: date})
  }

  // @ts-ignore
  const handleChangeToDate = (date) => {
    setFilterFields({toDate: date})
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/DD/YYYY"
        id={FilterField.FromDate}
        label="From"
        value={fromDate}
        onChange={handleChangeFromDate}
      />
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/DD/YYYY"
        id={FilterField.ToDate}
        label="To"
        value={toDate}
        onChange={handleChangeToDate}
      />
    </MuiPickersUtilsProvider>
  )
}

export default InputDate
