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
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/product-list");
    }
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
                  <h1 align="center" className="left1">
                    Log In
                  </h1>
                </div>
                <div className="login_subhead__e1IaE">Admin Login</div>
                <div className="input-group">
                  <FormGroup>
                    <FormControl
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="a"
                      onChange={this.props.onInputChange}
                    />

                    {emailError ? (
                      <p className="text-danger">{emailError}</p>
                    ) : null}
                  </FormGroup>
                </div>
                <div className="input-group">
                  <FormGroup>
                    <FormControl
                      required="true"
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      className="a"
                      onChange={this.props.onInputChange}
                    />
                    {passwordError ? (
                      <p className="text-danger">{passwordError}</p>
                    ) : null}
                  </FormGroup>
                </div>
                <Button
                  variant="success"
                  type="submit"
                  className="btn btn-block "
                >
                  <i class="fas fa-sign-in-alt top" />
                  {isLoading ? "Please wait..." : "Sign In"}
                </Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
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
