import React, { Component } from 'react';
import Alert from '../components/alert.js';

class EnterImeiNo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imei: props.data.imei,
      alert: {
        msg: [],
        show: false,
        type: 'success'
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e) {
    if (e.target.value.length <= 16) {
      this.setState({
        imei: e.target.value,
        alert: {
          msg: [],
          alert: false,
          type: 'danger'
        }
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.imei.length !== 15 && this.state.imei.length !== 16) {
      this.setState({
        alert: {
          msg: 'Please enter valid 15 digit IMEI number',
          alert: true,
          type: 'danger'
        }
      });
      return;
    }
    const appointment = this.props.data;
    appointment['imei'] = this.state.imei;
    this.props.spinner(true);
    this.props.action(6, appointment);
  }

  componentDidMount() {
    this.props.spinner(false);
  }

  render() {
    return (
      <div className="select-imbi-no box">
        <div className="s_t">
          <h2>Enter IMEI number</h2>
        </div>
        <Alert {...this.state.alert} />
        <form className="fg1 df fdc" onSubmit={this.handleFormSubmit}>
          <div className="inputs">
            <input
              type="number"
              required={true}
              autoFocus={true}
              name="imeiNo"
              value={this.state.imei}
              onChange={this.handleInputChange}
              style={{ marginBottom: '10px' }}
              placeholder="Ex: 990000862471854"
            />
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
                this.props.action(4, this.props.data);
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

export default EnterImeiNo;
