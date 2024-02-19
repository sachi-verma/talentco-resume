import React, { useState } from "react";
import validator from "validator";


export default class StepOne extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: ""
    };
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
  }

  handleFirstNameChanged(event) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChanged(event) {
    this.setState({ lastName: event.target.value });
  }

  
  render() {
    return (
      <div>
        <div className="row">
          <div className="six columns">
            <label>First Name</label>
            <input
              className="u-full-width"
              placeholder="Enter your first name"
              type="text"
              onChange={this.handleFirstNameChanged}
              value={this.state.firstName}
              required
              // autoFocus
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>Last Name</label>
            <input
              className="u-full-width"
              placeholder="Enter your last name"
              type="text"
              onChange={this.handleLastNameChanged}
              value={this.state.lastName}
              required
            />
          </div>
        </div>
      </div>
    );
  }
}