import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 0,
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function OneSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    number: props.parentValue,
  });
  
  // общий компонент для одиночного выбора селекта(Material UI)

  function handleChange(event) {
    setValues(() => ({
      [event.target.name]: event.target.value,
    }));
    props.parentValueChange(event.target.value)
  }

  const menuItems = !!props.data 
  ? props.data 
  : [];

  return (
    <form className={classes.root} autoComplete="off" >
      <FormControl className={classes.formControl}>
        <Select
          value={values.number}
          onChange={handleChange}
          displayEmpty
          name="number"
          className={classes.selectEmpty}
        >
          {props.label === "Platforms" 
            ? <MenuItem value="">All</MenuItem>
            : ""}
          {menuItems.map((item, i) => {
            return <MenuItem key={i} value={item.value}>{item.label}</MenuItem>
          })}
        </Select>
        <FormHelperText>{props.label}</FormHelperText>
      </FormControl>
    </form>
  );
}
