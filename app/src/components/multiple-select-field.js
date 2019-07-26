import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Input,
  MenuItem,
  FormControl,
  Select,
  CircularProgress
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },

  noLabel: {
    marginTop: theme.spacing(2)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const MultipleSelectField = ({
  error,
  data,
  loading,
  type,
  createQueryParams,
  queryParam,
  removeQueryParams
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [fields, setFields] = React.useState([]);

  function handleChange(event) {
    setFields(event.target.value);
    if (event.target.value.length) {
      createQueryParams({ [queryParam]: event.target.value });
    } else removeQueryParams(queryParam);
  }
  // console.log(data);
  if (error) return <p>Error</p>;
  if (!data || loading) return <CircularProgress />;
  return (
    <FormControl className={clsx(classes.formControl, classes.noLabel)}>
      <Select
        multiple
        displayEmpty
        value={fields}
        onChange={handleChange}
        input={<Input id="select-multiple-placeholder" />}
        renderValue={selected => {
          if (selected.length === 0) {
            return <em>{type}</em>;
          }
          const text = selected.map(n => data[n - 1].label).join(", ");
          return text;
        }}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
        {data.map(({ label, value }) => (
          <MenuItem
            key={value}
            value={value}
            style={getStyles(label, fields, theme)}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default MultipleSelectField;
