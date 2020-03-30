import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "./filters-field.scss";
import "react-datepicker/dist/react-datepicker.css";

import { Dropdown } from 'semantic-ui-react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


class FiltersField extends Component {

  constructor(props) {
    super(props);
    this.props = props 
  }
  state = {
    selectedDateFrom: new Date(),
    selectedDateTo: new Date(),
  };

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

  optionsCreator2 = (objectOfItems) => {
    const options = objectOfItems.map((item, index) => {
      return {value: item.value, label: item.label}
    })
    return options
  }

  onSelect = (selectedList, selectedItem) => {
    console.log(selectedItem);
    console.log(selectedList)
    this.props.testFunc()
    console.log(selectedList.id)
  }

  onRemove(selectedList, removedItem) {
    console.log(removedItem);
  }

  onChangeSelectHandler = (selectedOption) => {
    console.log(selectedOption)
  }

  isDisabled = (label) => {
    if (label.toLowerCase() === this.props.groupBy.toLowerCase()) {
      return false
    } else return true
  }


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
            <label className="disBlock" htmlFor="dateFrom">
              From
            </label>
            <DatePicker
              selected={selectedDateFrom}
              onChange={date => changeDateFrom(date)}
              id="dateFrom"
              className="customPicker"
              minDate={new Date(2019, 4, 24)}
            />
          </div>

          <div className="form-group col-md-4 childDatePicker">
            <label className="disBlock" htmlFor="dateTo">
              To
            </label>
            <DatePicker
              selected={selectedDateTo}
              onChange={date => changeDateTo(date)}
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
            <Select
              isMulti
              options={this.optionsCreator2(platforms)}
              onChange={e => onSelectHandler(e)}
              isDisabled={this.isDisabled("Platform")}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="OSSelect">Operating System</label>
            <Select
              isMulti
              options={this.optionsCreator2(operatingSystems)}
              onChange={e => onSelectHandler(e)}
              isDisabled={this.isDisabled("Operating System")}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="browserSelect">Browser</label>
            <Select
              isMulti
              options={this.optionsCreator2(browsers)}
              onChange={e => onSelectHandler(e)}
              isDisabled={this.isDisabled("Browser")}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FiltersField;
