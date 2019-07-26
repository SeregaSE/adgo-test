import React, { useEffect, useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import SelectField from "./select-field";
import MultipleSelectField from "./multiple-select-field";
import { fetchStatistics } from "../actions";
const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
    maxWidth: 200
  }
}));

const Form = props => {
  const {
    browsers,
    browsersError,
    browsersLoading,
    groups,
    groupsError,
    groupsLoading,
    operatingSystems,
    operatingSystemsError,
    operatingSystemsLoading,
    platforms,
    platformsError,
    platformsLoading,
    fetchStatistics,
    offset,
    limit
  } = props;
  const classes = useStyles();
  const date = new Date();
  const [dateFrom, setDateFrom] = useState(date.setMonth(date.getMonth() - 12));
  const [dateTo, setDateTo] = useState(new Date());
  const [queryParams, setQueryParams] = useState({});

  // гггг-мм-дд
  const handleDateFromChange = date => {
    setDateFrom(date);
    const yyyy = date.getFullYear();
    const MM = date.getMonth() + 1;
    const dd = date.getDate();
    const dateFrom = `${yyyy}-${MM < 10 ? "0" + MM : MM}-${
      dd < 10 ? "0" + dd : dd
    }&`;
    createQueryParams({ from: [dateFrom] });
  };
  const handleDateToChange = date => {
    setDateTo(date);
    const yyyy = date.getFullYear();
    const MM = date.getMonth() + 1;
    const dd = date.getDate();
    const dateTo = `${yyyy}-${MM < 10 ? "0" + MM : MM}-${
      dd < 10 ? "0" + dd : dd
    }&`;

    createQueryParams({ to: [dateTo] });
  };

  const createQueryParams = newParams => {
    setQueryParams({
      ...queryParams,
      ...newParams
    });
  };
  const removeQueryParams = param => {
    const newQuery = { ...queryParams };
    delete newQuery[param];
    setQueryParams({
      ...newQuery
    });
  };
  useEffect(() => {
    let params = { ...queryParams };
    if (!params.from) {
      const date = new Date(dateFrom);
      const yyyy = date.getFullYear();
      const MM = date.getMonth() + 1;
      const dd = date.getDate();
      const dateFromString = `${yyyy}-${MM < 10 ? "0" + MM : MM}-${
        dd < 10 ? "0" + dd : dd
      }&`;
      params = {
        ...params,
        from: [dateFromString]
      };
    }
    if (!params.to) {
      const date = new Date(dateTo);
      const yyyy = date.getFullYear();
      const MM = date.getMonth() + 1;
      const dd = date.getDate();
      const dateToString = `${yyyy}-${MM < 10 ? "0" + MM : MM}-${
        dd < 10 ? "0" + dd : dd
      }&`;

      params = {
        ...params,
        to: [dateToString]
      };
    }
    if (!params.groupBy) return;
    const string = Object.entries(params)
      .map(([param, variable]) => variable.map(v => `&${param}=${v}`).join(""))
      .join("");
    // "offset=1&limit=25"

    fetchStatistics(`${string}offset=${offset}&limit=${limit}`);
  }, [queryParams, offset, limit]);

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.formControl}
          clearable
          value={dateFrom}
          label="From"
          onChange={handleDateFromChange}
          format="yyyy/MM/dd"
        />
        <KeyboardDatePicker
          className={classes.formControl}
          clearable
          value={dateTo}
          label="To"
          onChange={handleDateToChange}
          maxDate={new Date()}
          format="yyyy/MM/dd"
        />

        <SelectField
          removeQueryParams={removeQueryParams}
          createQueryParams={createQueryParams}
          error={groupsError}
          data={groups}
          loading={groupsLoading}
          type="Groups"
          queryParam="groupBy"
          isRequired={true}
        />

        <SelectField
          removeQueryParams={removeQueryParams}
          createQueryParams={createQueryParams}
          error={platformsError}
          data={platforms}
          loading={platformsLoading}
          type="Platforms"
          queryParam="platform"
        />
        <MultipleSelectField
          removeQueryParams={removeQueryParams}
          createQueryParams={createQueryParams}
          error={operatingSystemsError}
          data={operatingSystems}
          loading={operatingSystemsLoading}
          type="Operating Systems"
          queryParam="operatingSystems[]"
        />
        <MultipleSelectField
          removeQueryParams={removeQueryParams}
          createQueryParams={createQueryParams}
          error={browsersError}
          data={browsers}
          loading={browsersLoading}
          type="Browsers"
          queryParam="browsers[]"
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  browsers: state.browsers.data,
  groups: state.groups.data,
  operatingSystems: state.operatingSystems.data,
  platforms: state.platforms.data,
  browsersLoading: state.browsers.loading,
  groupsLoading: state.groups.loading,
  operatingSystemsLoading: state.operatingSystems.loading,
  platformsLoading: state.platforms.loading,
  browsersError: state.browsers.error,
  groupsError: state.groups.error,
  operatingSystemsError: state.operatingSystems.error,
  platformsError: state.platforms.error,
  offset: state.statistics.offset,
  limit: state.statistics.limit
});

const mapDispatchToProps = {
  fetchStatistics
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
