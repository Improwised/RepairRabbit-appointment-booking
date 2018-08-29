import React, { Component } from 'react';
import Alert from '../components/alert.js';
import Radio from '../components/radio.js';
import { getData } from '../apisList.js';

class SelectDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      selectedStore: props.data.store,
      alert: {
        msg: [],
        show: false,
        type: 'success'
      }
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderStores = this.renderStores.bind(this);
  }

  renderStores() {
    return this.state.stores.map(store => (
      <Radio
        id={`s${store.id}`}
        key={`s${store.id}`}
        value={store.id}
        name={store.address}
        onChange={this.handleOptionChange}
        checked={this.state.selectedStore === String(store.id)}
      />
    ));
  }

  componentDidMount() {
    // get all avalable stores for selected device
    getData(
      `/stores?device_id=${
        this.props.data.device
      }&order=asc&orderBy=name&filterStatus=1`,
      response => {
        this.setState({
          stores: response.data.stores.data
        });
        this.props.spinner(false);
      },
      error => {
        this.props.spinner(false);
      }
    );
  }

  handleOptionChange(e) {
    this.setState({
      selectedStore: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (!this.state.selectedStore) {
      this.setState({
        alert: {
          msg: 'Please select store',
          alert: true,
          type: 'danger'
        }
      });
      return;
    }
    const appointment = this.props.data;
    appointment['store'] = this.state.selectedStore;
    this.props.spinner(true);
    this.props.action(4, appointment);
  }

  render() {
    return (
      <div className="select-store box">
        <div className="s_t">
          <h2>Select Store</h2>
        </div>
        <Alert {...this.state.alert} />
        <form className="df fdc" onSubmit={this.handleFormSubmit}>
          <div className="inputs">
            <div>{this.renderStores()}</div>
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
                this.props.action(2, this.props.data);
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

export default SelectDevice;
