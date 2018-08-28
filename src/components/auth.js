import React, { Component } from 'react';
import Alert from '../components/alert.js';
import { getData, postData } from '../apisList.js';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegister: true,
      name: '',
      email: '',
      password: '',
      alert: {
        msg: [],
        alert: false,
        type: 'danger'
      }
    };
    this.updateAuthType = this.updateAuthType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.props.spinner(false);
    if (this.state.isRegister) {
      document.querySelector("input[type='text']").focus();
    } else {
      document.querySelector("input[type='email']").focus();
    }
  }

  login() {
    postData(
      `/login`,
      {
        email: this.state.email,
        password: this.state.password
      },
      response => {
        // main appointment action will goes here
        const appointment = this.props.data;
        appointment['userId'] = response.data.user_id;
        appointment['token'] = response.data.token;
        this.props.action(7, appointment);
      },
      error => {
        // if something goes wrong while login
        this.setState({
          alert: {
            msg: error.response.data.messages,
            alert: true,
            type: 'danger'
          }
        });
        this.props.spinner(false);
      }
    );
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      alert: {
        msg: [],
        alert: false,
        type: 'danger'
      }
    });
  }

  updateAuthType() {
    this.setState({
      isRegister: !this.state.isRegister
    });
    setTimeout(() => {
      if (this.state.isRegister) {
        document.querySelector("input[type='text']").focus();
      } else {
        document.querySelector("input[type='email']").focus();
      }
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.spinner(true);
    getData(
      `/email-check?email=${this.state.email}`,
      response => {
        if (this.state.isRegister) {
          postData(
            `/register`,
            {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password
            },
            response => {
              this.login();
            },
            error => {
              // if something goes wrong while register
              this.setState({
                alert: {
                  msg: error.response.data.messages,
                  alert: true,
                  type: 'danger'
                }
              });
              this.props.spinner(false);
            }
          );
        } else {
          this.setState({
            alert: {
              msg: 'this email is not registered with us, please register',
              alert: true,
              type: 'danger'
            }
          });
          this.props.spinner(false);
        }
      },
      error => {
        if (this.state.isRegister) {
          // email is already exist with us
          this.setState({
            alert: {
              msg: error.response.data.message,
              alert: true,
              type: 'danger'
            }
          });
          this.props.spinner(false);
        } else {
          this.login();
        }
      }
    );
  }

  render() {
    return (
      <div className="auth box">
        <div className="s_t">
          <h2>{this.state.isRegister ? 'Register' : 'Login'}</h2>
          <br />
          <a className="already-account" onClick={this.updateAuthType}>
            {this.state.isRegister ? 'Have account?' : "Don't have account?"}
          </a>
        </div>
        <Alert {...this.state.alert} />
        <form className="fg1 df fdc" onSubmit={this.handleFormSubmit}>
          <div className="inputs">
            {this.state.isRegister ? (
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder=""
                  required={true}
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>
            ) : (
              <div />
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder=""
                required={true}
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder=""
                required={true}
                autoComplete="true"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="actions">
            <button type="submit" className="btn next">
              Submit
            </button>
            <button
              className="btn cancel"
              onClick={e => {
                e.preventDefault();
                this.props.spinner(true);
                this.props.action(5, this.props.data);
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

export default Auth;
