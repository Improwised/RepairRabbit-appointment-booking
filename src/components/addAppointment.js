import React, { Component } from 'react';
import moment from 'moment';

import SelectDevice from '../components/selectDevice.js';
import SelectYourRepair from '../components/selectYourRepair.js';
import SelectStore from '../components/selectStore.js';
import SelectDataTime from '../components/selectDataTime.js';
import EnterImeiNo from '../components/enterImeiNo.js';
import Auth from '../components/auth.js';
import CreateAppointment from '../components/createAppointment.js';

class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 1,
      appointment: {
        userId: 0,
        device: '1',
        products: [],
        store: 0,
        date: moment(),
        timeSlot: '',
        imei: '',
        token: ''
      }
    };
    this.section = this.section.bind(this);
    this.updateSection = this.updateSection.bind(this);
  }

  section(section) {
    switch (section) {
      case 2:
        return (
          <SelectYourRepair
            action={this.updateSection}
            data={this.state.appointment}
            spinner={this.props.spinner}
          />
        );
      case 3:
        return (
          <SelectStore
            action={this.updateSection}
            data={this.state.appointment}
            spinner={this.props.spinner}
          />
        );
      case 4:
        return (
          <SelectDataTime
            action={this.updateSection}
            data={this.state.appointment}
            spinner={this.props.spinner}
          />
        );
      case 5:
        return (
          <EnterImeiNo
            action={this.updateSection}
            data={this.state.appointment}
            spinner={this.props.spinner}
          />
        );
      case 6:
        return (
          <Auth
            action={this.updateSection}
            data={this.state.appointment}
            spinner={this.props.spinner}
          />
        );
      case 7:
        return (
          <CreateAppointment
            action={this.updateSection}
            data={this.state.appointment}
            spinner={this.props.spinner}
          />
        );
      default:
        return (
          <SelectDevice
            action={this.updateSection}
            data={this.state.appointment}
            spinner={this.props.spinner}
          />
        );
    }
  }

  updateSection(section, value) {
    this.setState(prevState => ({
      activeSection: section,
      appointment: value
    }));
  }

  render() {
    return this.section(this.state.activeSection);
  }
}

export default AddAppointment;
