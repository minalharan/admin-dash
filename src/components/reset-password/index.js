import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Input
} from "reactstrap";
class ResetComponent extends Component {
  render() {
    const { password, updated } = this.props;
    const { errors, cpassword } = this.props;
    const {
      password: passwordError,
      cpassword: cpasswordError
    } = this.props.errors;

    if (updated == false) {
      return (
        <>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
            integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
            crossorigin="anonymous"
          />
          <div className="login_loginContainer__2JMrT">
            <div className="login_formSignin__27WMl">
              <p>Problem resetting password. Please send another reset link.</p>
              <Link to={"/"}>
                <Button>Go Home</Button>
              </Link>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Link to={"/forgot-password"}>
                <Button>Forgot Password</Button>
              </Link>
            </div>
          </div>
        </>
      );
    } else if (updated == true) {
      return (
        <>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
            integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
            crossorigin="anonymous"
          />
          <div className="login_loginContainer__2JMrT">
            <form
              className="password-form"
              onSubmit={this.props.updatePassword}
              noValidate
              className="login_formSignin__27WMl"
            >
              <div>
                <h1 className="forgot">Forgot Password</h1>
              </div>
              <div className="input-group">
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required="true"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={this.props.onInputChange}
                  />
                </InputGroup>
                {passwordError ? (
                  <p className=" text-danger">{passwordError}</p>
                ) : null}
              </div>
              <div className="input-group">
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required="true"
                    type="password"
                    placeholder="Enter Confirm Password"
                    name="cpassword"
                    onChange={this.props.onInputChange}
                  />
                </InputGroup>{" "}
                {cpasswordError ? (
                  <p className=" text-danger">{cpasswordError}</p>
                ) : null}
              </div>
              <InputGroup>
                <Button
                  type="submit"
                  color="success"
                  className="btn btn-dark btn-block "
                >
                  Update Password
                </Button>
                &nbsp;&nbsp;
                <Link to={"/login"}>
                  <Button color="primary" className="btn btn-block goBack">
                    Log In
                  </Button>
                </Link>
              </InputGroup>
            </form>
          </div>
        </>
      );
    }
  }
}
export default ResetComponent;
