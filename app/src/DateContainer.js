import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';

import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

class DateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
    };
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  componentDidMount(){
    this.setState({from: new Date(this.props.from)});
    this.setState({to: new Date(this.props.to)});
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    this.props.setDate('from', `${formatDate(from, 'YYYY-MM-D')}`);
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    this.props.setDate('to', `${formatDate(to, 'YYYY-MM-D')}`);
  }

  render(){
    const FORMAT = 'YYYY-MM-DD';
    const { from, to } = this.state;

    const modifiers = { start: from, end: to };
    return (
        <div className="InputFromTo col-xs-12 col-md-6 form-row">
          <div className="col-md-6 col-xs-12">
            <label>
              From
            </label>
            <DayPickerInput
              value={from}
              placeholder="From"
              format={FORMAT}
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { after: to },
                toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => this.to.getInput().focus(),
              }}
              onDayChange={this.handleFromChange}
            />
          </div>
        <div className="col-md-6 col-xs-12">
          <label>To</label>
          <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="To"
            format={FORMAT}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        </div>
        </div>);
  }
}

export default DateContainer;
