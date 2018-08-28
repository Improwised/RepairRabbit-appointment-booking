import React, { Component } from 'react';
import AddAppointment from './components/addAppointment.js';
import Spinner from './components/spinner.js';
import logo from './assets/img/logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerDisplay: true
    };
    this.updateSpinner = this.updateSpinner.bind(this);
  }

  updateSpinner(value) {
    this.setState({
      spinnerDisplay: value
    });
  }

  render() {
    return (
      <div>
        <div className="bk" />
        <div className="left-side">
          <div>
            <div className="text-center">
              <img src={logo} alt="RepairRabbit" />
              <h2>Enhance your repair business with RepairRabbit</h2>
              <br />
              <p>Do you want to use RepairRabbit for your business?</p>
              <a
                href="https://www.repairrabbit.co/mailto:contact@repairrabbit.co?subject=Query of RepairRabbit"
                title="Query of RepairRabbit"
              >
                contact us
              </a>{' '}
              for pricing & purchase information
            </div>
          </div>
        </div>
        <div className="wapper">
          <div className="right-side a_a">
            <h1 className="text-center">Add Appointment</h1>
            <Spinner show={this.state.spinnerDisplay} />
            <AddAppointment spinner={this.updateSpinner} />
            <div className="text-center">
              © All rights reserved RepairRabbit
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
