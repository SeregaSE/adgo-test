import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date(props.initialDate));

  function handleDateChange(date) {
    setSelectedDate(date);
    toParentSubmit(new Date(date));
  }

  // общий компонент для выбора дат(Material UI)

  const toParentSubmit = (submitDate) => {
    props.changeDate(props.label, 
        `${submitDate.getFullYear()}-${('0' + (submitDate.getMonth() + 1)).slice(-2)}-${('0' + submitDate.getDate()).slice(-2)}`);
  }


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={props.label}
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}