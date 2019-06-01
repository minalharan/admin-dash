import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Container,
  Button
} from "reactstrap";
import { FormGroup, Col } from "react-bootstrap";

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
                  <h1 align="center" className="left1">
                    Log In
                  </h1>
                </div>
                <div className="login_subhead__e1IaE">Admin Login</div>
                <div>
                  <div className="mb-100 input-group">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i class="fas fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        //className="a"
                        onChange={this.props.onInputChange}
                      />
                    </InputGroup>{" "}
                    {emailError ? (
                      <p className="text-danger">{emailError}</p>
                    ) : null}
                  </div>
                  <div className="mb-100 input-group">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-key" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required="true"
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        className="a"
                        onChange={this.props.onInputChange}
                      />
                    </InputGroup>{" "}
                    {passwordError ? (
                      <p className="text-danger">{passwordError}</p>
                    ) : null}
                  </div>
                </div>
                <Row>
                  <Button
                    color="info"
                    type="submit"
                    className="btn btttn text-white"
                  >
                    <i class="fas fa-sign-in-alt top" />
                    {isLoading ? "Please wait..." : "Log In"}
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/forgot-password">
                    <p className="d link1">Forgot password ?</p>
                  </Link>
                </Row>
              </Container>
            </Row>
          </form>
        </div>
      </>
    );
  }
}

export default LoginComponent;
