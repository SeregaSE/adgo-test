import React, { useState } from "react";

import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { changeGroups } from "../actions";
import { connect } from "react-redux";
const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
    minWidth: 200
  }
}));
const SelectField = ({
  error,
  data,
  loading,
  type,
  isRequired,
  createQueryParams,
  queryParam,
  removeQueryParams,
  changeGroups
}) => {
  const [option, setOption] = useState("");
  const handleChange = e => {
    setOption(e.target.value);
    if (type === "Groups") changeGroups(e.target.value);
    if (e.target.value) {
      createQueryParams({ [queryParam]: [e.target.value] });
    } else removeQueryParams(queryParam);
  };
  const classes = useStyles();
  if (error) return <p>Error</p>;
  if (!data || loading) return <CircularProgress />;
  if (isRequired && !option && type === "Groups") {
    changeGroups(data[0].value);
    setOption(data[0].value);
    createQueryParams({ [queryParam]: [data[0].value] });
  }
  const htmlForId = `${type}-helper`;
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={htmlForId}>{type}</InputLabel>
      <Select
        value={option}
        onChange={handleChange}
        input={<Input name={type} id={htmlForId} />}
      >
        {!isRequired ? (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        ) : null}
        {data.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default connect(
  null,
  { changeGroups }
)(SelectField);
