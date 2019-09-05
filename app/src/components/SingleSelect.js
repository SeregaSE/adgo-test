import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '250px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SingleSelect = props => {
  const { label, value, onChange } = props;
  const options = props.presetOptions || props.options;
  const classes = useStyles();
  const inputLabel = useRef(null);  

  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={e => onChange(e.target.value)}
          input={<OutlinedInput labelWidth={labelWidth} name={label} id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option, i) => <MenuItem key={i} value={`${option.value}`}>{option.label}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
};

export default SingleSelect;