import React, { Component } from 'react';
import Alert from '../components/alert.js';
import Radio from '../components/radio.js';
import { getData } from '../apisList.js';

class SelectDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devicesLists: [],
      device: props.data.device,
      alert: {
        msg: [],
        show: false,
        type: 'success'
      }
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderDevices = this.renderDevices.bind(this);
  }

  // render devices list
  renderDevices() {
    return this.state.devicesLists.map(device => {
      if (device.is_product_added) {
        return (
          <Radio
            id={`d${device.id}`}
            key={`d${device.id}`}
            value={device.id}
            name={device.name}
            onChange={this.handleOptionChange}
            checked={this.state.device === String(device.id)}
          />
        );
      }
      return <div key={device.id} />;
    });
  }

  componentDidMount() {
    // get all avalable devices
    getData(
      '/devices?order=asc&orderBy=id&filterStatus=1',
      response => {
        this.setState({
          devicesLists: response.data.devices.data
        });
        this.props.spinner(false);
      },
      error => {
        this.props.spinner(false);
      }
    );
  }

  // update selected device
  handleOptionChange(e) {
    this.setState({
      device: e.target.value
    });
  }

  // handel form submit
  handleFormSubmit(e) {
    e.preventDefault();
    if (!this.state.device) {
      this.setState({
        alert: {
          msg: 'Please select device',
          alert: true,
          type: 'danger'
        }
      });
      return;
    }
    const appointment = this.props.data;
    appointment['device'] = this.state.device;
    this.props.spinner(true);
    this.props.action(2, appointment);
  }

  render() {
    return (
      <div className="box">
        <div className="s_t">
          <h2>Select Device</h2>
        </div>
        <Alert {...this.state.alert} />
        <form className="fg1 df fdc" onSubmit={this.handleFormSubmit}>
          <div className="inputs">{this.renderDevices()}</div>
          <div className="actions">
            <button type="submit" className="btn next">
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SelectDevice;
