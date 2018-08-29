import React, { Component } from 'react';
import Alert from '../components/alert.js';
import Checkbox from '../components/checkbox.js';
import { getData } from '../apisList.js';

class selectYourRepair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProducts: props.data.products,
      alert: {
        msg: [],
        show: false,
        type: 'success'
      }
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderDefects = this.renderDefects.bind(this);
  }

  renderDefects() {
    return this.state.products.map(product => (
      <Checkbox
        id={`de${product.id}`}
        key={`de${product.id}`}
        value={product.id}
        name={product.name}
        onChange={this.handleOptionChange}
        checked={this.state.selectedProducts.indexOf(String(product.id)) > -1}
      />
    ));
  }

  componentDidMount() {
    // get all avalible products/defects related to device
    getData(
      `/products?device_id=${this.props.data.device}&?order=asc&orderBy=id`,
      response => {
        this.setState({
          products: response.data.products.data
        });
        this.props.spinner(false);
      },
      error => {
        this.props.spinner(false);
      }
    );
  }

  handleOptionChange(e) {
    const sProducts = this.state.selectedProducts;
    const index = sProducts.indexOf(e.target.value);
    if (index > -1) {
      sProducts.splice(index, 1);
    } else {
      sProducts.push(e.target.value);
    }
    this.setState({
      selectedProducts: sProducts
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.selectedProducts.length === 0) {
      this.setState({
        alert: {
          msg: 'Please select at least one defect',
          alert: true,
          type: 'danger'
        }
      });
      return;
    }
    const appointment = this.props.data;
    appointment['products'] = this.state.selectedProducts;
    this.props.spinner(true);
    this.props.action(3, appointment);
  }

  render() {
    return (
      <div className="select-your-repair box">
        <div className="s_t">
          <h2>Select Your Repairs</h2>
        </div>
        <Alert {...this.state.alert} />
        <form className="df fdc" onSubmit={this.handleFormSubmit}>
          <div className="inputs">
            <div>{this.renderDefects()}</div>
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
                this.props.action(1, this.props.data);
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

export default selectYourRepair;
