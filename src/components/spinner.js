import React, { Component } from 'react';
import loadder from '../assets/img/spinner.svg';

class Radio extends Component {
  render() {
    return (
      <span>
        {this.props.show ? (
          <div className="loadder">
            <img src={loadder} alt="spinner" height="60" />
          </div>
        ) : (
          <span />
        )}
      </span>
    );
  }
}
export default Radio;
