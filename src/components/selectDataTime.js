import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Radio from '../components/radio.js';
import Alert from '../components/alert.js';
import { getData, convertIntoArray } from '../apisList.js';

import 'react-datepicker/dist/react-datepicker.css';

class SelectDataTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableSlots: [],
      showTimeSlots: false,
      slotsNotAvailable: false,
      selectedDate: props.data.date,
      seldctedTimeSlot: props.data.timeSlot
    };
    this.updateTimeSlot = this.updateTimeSlot.bind(this);
    this.renderTimeSlots = this.renderTimeSlots.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  updateTimeSlot(storeId, deviceId, date) {
    // get all avalable timeslot for date
    getData(
      `stores/${storeId}/devices/${deviceId}?appointment_date=${date}`,
      response => {
        this.setState({
          showTimeSlots: true,
          slotsNotAvailable: false,
          availableSlots: response.data.timeslots
        });
        this.props.spinner(false);
      },
      error => {
        if (error.response.status === 404) {
          // handle error
          if (
            error.response.data.messages[0] === 'Available timeslot not found.'
          ) {
            this.setState({
              showTimeSlots: false,
              slotsNotAvailable: true
            });
          } else {
            this.setState({
              alert: {
                msg: error,
                alert: true,
                type: 'danger'
              }
            });
          }
        } else if (error.response.status === 400) {
          this.setState({
            alert: {
              msg: error.response.data.messages,
              alert: true,
              type: 'danger'
            }
          });
        }
        this.props.spinner(false);
      }
    );
  }

  renderTimeSlots() {
    return convertIntoArray(this.state.availableSlots).map(slot => (
      <Radio
        id={`sl${slot.key}`}
        key={`sl${slot.key}`}
        value={slot.value}
        name={slot.value}
        onChange={this.handleOptionChange}
        checked={this.state.seldctedTimeSlot === slot.value}
      />
    ));
  }

  componentDidMount() {
    const datePicker = document.getElementsByClassName(
      'react-datepicker__input-container'
    )[0];
    datePicker.childNodes[0].setAttribute('readOnly', true);
    this.updateTimeSlot(
      this.props.data.store,
      this.props.data.device,
      this.props.data.date.format('YYYY-MM-DD')
    );
  }

  handleOptionChange(e) {
    this.setState({
      seldctedTimeSlot: e.target.value
    });
  }

  handleDateChange(date) {
    this.props.spinner(true);
    this.setState({
      showTimeSlots: false,
      slotsNotAvailable: false,
      selectedDate: date,
      seldctedTimeSlot: '',
      alert: {
        msg: [],
        alert: false,
        type: 'danger'
      }
    });
    this.updateTimeSlot(
      this.props.data.store,
      this.props.data.device,
      date.format('YYYY-MM-DD')
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.seldctedTimeSlot.length === 0 || !this.state.selectedDate) {
      this.setState({
        alert: {
          msg: 'Please select valid date & time',
          alert: true,
          type: 'danger'
        }
      });
      return;
    }
    const appointment = this.props.data;
    appointment['date'] = this.state.selectedDate;
    appointment['timeSlot'] = this.state.seldctedTimeSlot;
    this.props.spinner(true);
    this.props.action(5, appointment);
  }

  render() {
    return (
      <div className="select-date-time box">
        <div className="s_t">
          <h2>Select Date & time</h2>
        </div>
        <Alert {...this.state.alert} />
        <form className="fg1 df fdc" onSubmit={this.handleFormSubmit}>
          <div className="inputs">
            <h4>Select Date</h4>
            <br />
            <DatePicker
              minDate={moment()}
              dateFormat="YYYY-MM-DD"
              selected={this.state.selectedDate}
              onChange={this.handleDateChange}
              className="datepicker"
              required={true}
            />
            <br />
            <br />
            <h4>Select Time Slot</h4>
            {this.state.slotsNotAvailable ? (
              <p className="no-ts-a">
                Sorry, We don't have any time slots available for this date,
                Please pick another date
              </p>
            ) : (
              <span />
            )}
            {this.state.showTimeSlots ? (
              <div>{this.renderTimeSlots()}</div>
            ) : (
              <div />
            )}
          </div>
          <div className="actions">
            <button type="submit" className="btn next">
              Next
            </button>
            <button
              className="btn cancel"
              onClick={e => {
                e.preventDefault();
                this.props.spinner(true);
                this.props.action(3, this.props.data);
              }}
              tabIndex={-1}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SelectDataTime;
