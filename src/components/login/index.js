import React, { Component } from "react";
//import Axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Validator, { ValidationTypes } from "js-object-validation";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

import {
  FormGroup,
  FormLabel,
  Row,
  FormControl,
  Container
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoading, errors } = this.props;
    const { email: emailError, password: passwordError } = this.props.errors;
    return (
      <>
        <div className="login_loginContainer__2JMrT">
          <form
            onSubmit={this.props.onLogin}
            noValidate
            className="login_formSignin__27WMl"
          >
            <Row>
              <Container>
                <div align="center" className="login_login_header__3FYY0 ">
                  <h1 className="left">Log In</h1>
                </div>
                <div className="login_subhead__e1IaE">Admin Login</div>
                <div className="input-group">
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      // className="form-control email"
                      onChange={this.props.onInputChange}
                      className="a"
                    />
                    {emailError ? (
                      <p className="text-danger">{emailError}</p>
                    ) : null}
                  </InputGroup>
                </div>
                {/* <div className="input-group"> */}
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
                    // className="form-control email"
                    onChange={this.props.onInputChange}
                    className="a"
                  />
                  {passwordError ? (
                    <p className="text-danger">{passwordError}</p>
                  ) : null}
                </InputGroup>
                {/* </div> */}
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-dark btn-block "
                >
                  <i class="fas fa-sign-in-alt top" />
                  {isLoading ? "Please wait..." : "Sign In"}
                </Button>
                &nbsp; &nbsp;
                {/* <label>
                  <input name="Remeberme" type="checkbox" id="rememberme" />
                  Remeber Me
                </label>{" "} */}
                &nbsp; &nbsp;
                <Link to="/forgot-password">
                  <p className="d">Forgot password ?</p>
                </Link>
              </Container>
            </Row>
          </form>
        </div>
      </>
    );
  }
}

export default LoginComponent;
