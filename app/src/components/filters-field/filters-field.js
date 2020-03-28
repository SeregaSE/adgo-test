import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "./filters-field.scss";
import 'react-datepicker/dist/react-datepicker.css'

class FiltersField extends Component {

  state = {
    selectedDateFrom: new Date(),
    selectedDateTo: new Date()
  }

  optionsCreator = objectOfItems => {
    const options = objectOfItems.map((item, index) => {
      if (!index) {
        return (
          <option defaultValue key={index}>
            {item.label}
          </option>
        );
      }
      return <option key={index}>{item.label}</option>;
    });
    return options;
  };

  render() {
    const {
      onSelectHandler,
      onGroupBy,
      platforms,
      browsers,
      operatingSystems,
      groups,
      changeDateFrom,
      changeDateTo,
      selectedDateFrom,
      selectedDateTo
    } = this.props;
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-4 childDatePicker">
            <label className="disBlock" htmlFor="dateFrom">From</label>
            <DatePicker
              selected={selectedDateFrom}
              onChange={(date) => changeDateFrom(date)}
              id="dateFrom"
              className="customPicker"
              minDate={new Date(2019, 4, 24)}
            />
          </div>

          <div className="form-group col-md-4 childDatePicker">
            <label className="disBlock" htmlFor="dateTo">To</label>
            <DatePicker 
              selected={selectedDateTo}
              onChange={(date) => changeDateTo(date)}
              id="dateTo"
              className="customPicker" 
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="groupBySelect">GroupBy</label>
            <select
              id="groupBySelect"
              className="form-control"
              onChange={e => onGroupBy(e)}
            >
              {this.optionsCreator(groups)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="platfromSelect">Platform</label>
            <select
              id="platfromSelect"
              className="form-control"
              onChange={e => onSelectHandler(e)}
            >
              <option>...</option>
              {this.optionsCreator(platforms)}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="OSSelect">Operating System</label>
            <select
              id="OSSelect"
              className="form-control"
              onChange={e => onSelectHandler(e)}
            >
              <option>...</option>
              {this.optionsCreator(operatingSystems)}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="browserSelect">Browser</label>
            <select
              id="browserSelect"
              className="form-control"
              onChange={e => onSelectHandler(e)}
            >
              <option>...</option>
              {this.optionsCreator(browsers)}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default FiltersField;
