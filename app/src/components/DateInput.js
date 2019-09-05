import React from 'react';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '350px'
  }
}));

const DateInput = props => {
  const {value, setDate, minDate, maxDate, minDateMessage, maxDateMessage} = props;
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker 
      autoOk
        format="DD/MM/YYYY"
        className={classes.root}
        variant="inline"
        inputVariant="outlined"
        label={props.label}
        value={value}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
        minDateMessage={minDateMessage}
        maxDateMessage={maxDateMessage}
      />
    </MuiPickersUtilsProvider>
  ) 
}

export default DateInput;