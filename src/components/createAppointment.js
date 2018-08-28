import React, { Component } from 'react';
import axios from 'axios';
import success from '../assets/img/success.png';
import fail from '../assets/img/fail.png';
import Alert from '../components/alert.js';

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: true,
      show: false
    };
  }

  componentDidMount() {
    const appointmentData = Object.assign({}, this.props.data);
    appointmentData['date'] = appointmentData['date'].format('YYYY-MM-DD');
    appointmentData['device'] = Number(appointmentData['device']);
    appointmentData['imei'] = Number(appointmentData['imei']);
    appointmentData['products'] = appointmentData['products'].map(product =>
      Number(product)
    );
    appointmentData['store'] = Number(appointmentData['store']);
    delete appointmentData['token'];
    axios
      .post(
        `http://37.139.15.5:8000/api/v1/customers/appointments`,
        appointmentData,
        {
          headers: { Authorization: `Bearer ${this.props.data.token}` }
        }
      )
      .then(response => {
        this.props.spinner(false);
        this.setState({
          show: true
        });
      })
      .catch(error => {
        let errors = '';
        for (var key in error.response.data.messages) {
          if (error.response.data.messages.hasOwnProperty(key)) {
            errors += `${error.response.data.messages[key]}`;
          }
        }
        this.setState({
          show: true,
          success: false,
          alert: {
            msg: errors,
            alert: true,
            type: 'danger'
          }
        });
        this.props.spinner(false);
      });
  }

  render() {
    return (
      <div className="box">
        {this.state.show ? (
          <div>
            {this.state.success ? (
              <div className="appointment-success">
                <img src={success} alt="appointment created successfully" />
                <h2>Appointment created successfully</h2>
                <br />
                <p>
                  You can login at{' '}
                  <a
                    href="http://37.139.15.5:8000/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    http://37.139.15.5:8000/
                  </a>{' '}
                  & get update related of appointment
                </p>
              </div>
            ) : (
              <div className="appointment-failure">
                <img src={fail} alt="appointment created unsuccessfully" />
                <h2>Failure</h2>
                <br />
                <Alert {...this.state.alert} />
                <br />
                <p>
                  Please <a href="http://localhost:3000/">refresh</a> the page &
                  try again
                </p>
              </div>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default CreateAppointment;
