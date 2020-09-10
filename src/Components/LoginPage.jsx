import React from "react";
import { onLogin } from "../actions/action";
import { connect } from "react-redux";
import "../styles/LoginPage.css";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    console.log("called", this.props.value);
    this.props.onLogin(email, password);
  };
  render() {
    return (
      <div className="login-page-container" style={{ height: "100%" }}>
        <div className="login-details">
          <div className="loginBox">
            <div className="flashmessage-container">
              {false && (
                <div
                  className="flash-message flash-message-error"
                  data-qa="flash-message"
                >
                  <div
                    className="flash-message-text"
                    data-qa="flash-message-error"
                  >
                    There was an error during login, make sure provided
                    credentials are valid.
                  </div>
                </div>
              )}
            </div>
            <h2>Login</h2>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="inputBox">
                <label>E-mail</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  data-qa="username"
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="inputBox">
                <label>Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  data-qa="password"
                  onChange={this.handleOnChange}
                />
              </div>
              <button
                type="button"
                className="link"
                data-qa="forgot-password-link"
                onClick={this.props.handleClose}
              >
                Forgot password?
              </button>
              <button type="submit" className="button" data-qa="btn-login">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  value: state,
});
const mapDispatchToProps = (dispatch) => ({
  onLogin: (userName, Password) => dispatch(onLogin(userName, Password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
