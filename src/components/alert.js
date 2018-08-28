import React, { Component } from 'react';
import { isArray, convertIntoArray } from '../apisList.js';
import PropTypes from 'prop-types';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        msg: [],
        alert: false,
        type: 'success'
      }
    };
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let msgs = nextProps.msg;
    if (typeof msgs === 'string') {
      this.setState({
        alert: {
          msg: [msgs],
          alert: nextProps.alert,
          type: nextProps.type
        }
      });
      return;
    }
    if (!isArray(msgs)) {
      msgs = convertIntoArray(msgs);
    }
    this.setState({
      alert: {
        msg: msgs.map((message, index) => {
          return (
            <li
              key={message.key ? message.key : index}
              style={{ margin: '7px 0' }}
            >
              {message.value ? message.value : message}
            </li>
          );
        }),
        alert: nextProps.alert,
        type: nextProps.type
      }
    });
  }

  close() {
    this.setState(prevState => ({
      alert: {
        msg: [],
        alert: false,
        type: 'success'
      }
    }));
  }

  render() {
    return (
      <div
        className={
          'alert ' +
          (this.state.alert.alert ? '' : 'hide ') +
          this.state.alert.type
        }
      >
        <span className="df jcsb">
          <ul>{this.state.alert.msg}</ul>
          <button onClick={this.close}>&#10005;</button>
        </span>
      </div>
    );
  }
}

Alert.propTypes = {
  msg: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
    PropTypes.string.isRequired
  ]),
  alert: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

Alert.defaultProps = {
  msg: [],
  alert: false,
  type: 'success'
};

export default Alert;
