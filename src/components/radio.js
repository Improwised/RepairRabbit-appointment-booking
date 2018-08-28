import React, { Component } from 'react';

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      value: props.value,
      checked: props.checked,
      name: props.name
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      value: nextProps.value,
      checked: nextProps.checked,
      name: nextProps.name
    });
  }

  render() {
    return (
      <div className="radio">
        <input
          type="radio"
          id={this.state.id}
          value={this.state.value}
          checked={this.state.checked}
          onChange={this.props.onChange}
        />
        <label htmlFor={this.state.id}>{this.state.name}</label>
      </div>
    );
  }
}

export default Radio;
