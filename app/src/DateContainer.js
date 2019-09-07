import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

class DateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: '',
    };
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      dateFormatted: formatDate(selectedDay),
      isEmpty: !input.value.trim(),
      isValidDay: typeof selectedDay !== 'undefined',
      isDisabled: modifiers.disabled === true,
    });
  }

  render(){
    const FORMAT = 'MM-DD-YYYY';
    return (
      <div className="filter col">
        <div className="filter__label">
          { this.props.label }
        </div>
        <div className="filter__input">
          <DayPickerInput formatDate={formatDate}
          parseDate={parseDate}
          format={FORMAT}
          value={`${formatDate(new Date(this.props.date),FORMAT)}`} 
          onDayChange={this.handleDayChange}
          selectedDay={this.state.selectedDay}/>
        </div>
      </div>);
  }
}

export default DateContainer;
