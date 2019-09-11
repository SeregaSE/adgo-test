import React, { Component } from "react";
import { getTodayStr } from "../../utils";

import "./SelectForm.css";

export class SelectForm extends Component {
  handleInput = type => ({ target: { value } }) => {
    this.setState({ selects: { ...this.state.selects, [type]: value } });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const {
      platforms,
      browsers,
      operatingSystems,
      groups,
      handleInput
    } = this.props;

    return (
      <form className="select-form" onSubmit={this.handleSubmit}>
        <div className="wrapper">
          <div className="select-wrapper">
            <label className="select-label" htmlFor="date-from">
              Date From
              <input
                className="date-picker"
                min="2016-01-01"
                type="date"
                onChange={handleInput("dateFrom")}
              />
            </label>
            <label className="select-label" htmlFor="date-from">
              Date To
              <input
                className="date-picker"
                max={getTodayStr()}
                type="date"
                onChange={handleInput("dateTo")}
              />
            </label>
            <label className="select-label" htmlFor="group-by-id">
              Group By
              <select
                className="select-item"
                id="group-by-id"
                onChange={handleInput("groupBy")}
              >
                {groups.map((option, index) => {
                  return (
                    <option value={option.value} key={option.value + index}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className="select-wrapper">
            <label className="select-label" htmlFor="platforms-id">
              Platform
              <select
                className="select-item"
                id="platforms-id"
                onChange={handleInput("platform")}
              >
                <option value={null} key={"platforms-key"}>
                  none
                </option>
                {platforms.map((option, index) => {
                  return (
                    <option value={option.value} key={option.value + index}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="select-label" htmlFor="os-id">
              Operating System
              <select
                className="select-item"
                id="os-id"
                onChange={handleInput("operatingSystem")}
              >
                <option value={null} key={"os-key"}>
                  none
                </option>
                {operatingSystems.map((option, index) => {
                  return (
                    <option value={option.value} key={option.value + index}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="select-label" htmlFor="browsers-id">
              Browser
              <select
                className="select-item"
                id="browsers-id"
                onChange={handleInput("browser")}
              >
                <option value={null} key={"browsers-key"}>
                  none
                </option>
                {browsers.map((option, index) => {
                  return (
                    <option value={option.value} key={option.value + index}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
        <button className="select-form__submit-btn" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
