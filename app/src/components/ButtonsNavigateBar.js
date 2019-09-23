import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import OneSelect from "./fields/OneSelect";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(0),
  },
  input: {
    display: 'none',
  },
}));

export default function ButtonsNavigateBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.offset);

  // компонент постраничной навигации

  const onClick = (event) => {
    setValue(event.currentTarget.value);
    props.changeOffset(Number(event.currentTarget.value));
    console.log(props, value)
  }

  const Buttons = () => {
    let buttonsArray = [];
    for (let i = 0; i < Math.ceil(props.count/Number(props.limit)); i++){
      buttonsArray.push(
      <Button 
        variant={Number(value) === i ? "contained" : "outlined"}
        color="secondary" 
        className={classes.button}
        onClick={onClick}
        value={i}
        key={i}>
         {i+1}
      </Button>)
    }
    return buttonsArray;
  }

  return (
    <div className="navigate-bar">
      <div className="navigate-bar__buttons">
        <Buttons />
      </div>
      <div className="navigate-bar__limit">
        <label htmlFor="">Limit:</label>
        <OneSelect 
            parentValueChange={props.changeLimit} 
            label={""} 
            data={[
              {value: "10", label: "10"}, 
              {value: "25", label: "25"}, 
              {value: "50", label: "50"}
            ]}
            parentValue={props.limit}
            />
      </div>
    </div>
  );
}