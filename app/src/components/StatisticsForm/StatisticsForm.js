import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { Form, Field } from "react-final-form";
import {
  Button,
  Grid,
  Paper,
  MenuItem,
  InputLabel,
  Input,
  TextField,
  Select,
  FormControl
} from "@material-ui/core/";

import {
  paramsRequest,
  statisticsRequest,
  statisticsFilterChanged,
  getParams,
  getFilter
} from "../../modules/Statistics";

const MapStateToProps = state => ({
  params: getParams(state),
  filter: getFilter(state)
});

const MapDispatchToProps = {
  paramsRequest,
  statisticsRequest,
  statisticsFilterChanged
};

const styles = {
  form: {
    padding: "1rem"
  },

  form__item: {
    width: "100%"
  }
};

function options(data) {
  return !data
    ? null
    : data.map(item => (
        <MenuItem value={item.value} key={item.value}>
          {item.label}
        </MenuItem>
      ));
}

function formatDate(date) {
  var dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  var yy = date.getFullYear();

  return yy + "-" + mm + "-" + dd;
}

class StatisticsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    let dateCurrent = formatDate(new Date());
    let datePrev = new Date();
    datePrev.setMonth(datePrev.getMonth() - 1);
    datePrev = formatDate(datePrev);

    this.state = {
      browsers: [1],
      OS: [1],
      platforms: 1,
      groupBy: "day",
      from: datePrev,
      to: dateCurrent
    };
    this.classes = props;
  }

  componentDidMount() {
    this.props.paramsRequest();
  }

  onSubmit = evt => {
    let that = this;
    evt.preventDefault();
    if (that.state.from > that.state.to) {
      console.log("Неверные даты");
      return null;
    }

    that.props.statisticsFilterChanged({
      ...that.props.filter,
      groupBy: that.state.groupBy,
      fromDate: that.state.from === "" ? undefined : that.state.from,
      toDate: that.state.to === "" ? undefined : that.state.to,
      offset: 0,
      platforms: that.state.platforms,
      browsers: that.state.browsers,
      operatingSystems: that.state.OS
    });
  };

  handleChange = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleChangeMultipleSelect = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  render() {
    const { platforms, browsers, OS, groups } = this.props.params;
    const { classes } = this.props;

    return (
      <Paper>
        <form onSubmit={this.onSubmit} className={classes.form}>
          <Grid container alignItems="flex-start" spacing={2} padding={16}>
            <Grid item xs={6}>
              <FormControl className={classes.form__item}>
                <InputLabel htmlFor="from">From</InputLabel>
                <Input
                  name="from"
                  value={this.state.from}
                  onChange={this.handleChange}
                  type="date"
                  inputProps={{
                    id: "from"
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.form__item}>
                <InputLabel htmlFor="to">To</InputLabel>
                <Input
                  name="to"
                  value={this.state.to}
                  onChange={this.handleChange}
                  type="date"
                  inputProps={{
                    id: "to"
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.form__item}>
                <InputLabel htmlFor="groupBy">Group By</InputLabel>
                <Select
                  name="groupBy"
                  onChange={this.handleChange}
                  value={this.state.groupBy}
                  inputProps={{
                    id: "groupBy"
                  }}
                >
                  {options(groups)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.form__item}>
                <InputLabel htmlFor="platforms">Platforms</InputLabel>
                <Select
                  name="platforms"
                  onChange={this.handleChange}
                  value={this.state.platforms}
                  inputProps={{
                    id: "platforms"
                  }}
                >
                  {options(platforms)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.form__item}>
                <InputLabel htmlFor="OS">Operating systems</InputLabel>
                <Select
                  name="OS"
                  value={this.state.OS}
                  onChange={this.handleChangeMultipleSelect}
                  multiple
                  inputProps={{
                    id: "OS"
                  }}
                >
                  {options(OS)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl className={classes.form__item}>
                <InputLabel htmlFor="browsers">Browsers</InputLabel>
                <Select
                  name="browsers"
                  value={this.state.browsers}
                  onChange={this.handleChangeMultipleSelect}
                  multiple
                  inputProps={{
                    id: "browsers"
                  }}
                >
                  {options(browsers)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify="center">
                <Button variant="contained" type="submit">
                  Отфильтровать
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withStyles(styles)(StatisticsForm));
