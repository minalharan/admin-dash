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
                <div className="mb-100 input-group">
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-envelope" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      onChange={this.props.onInputChange}
                    />
                  </InputGroup>{" "}
                  {emailError ? (
                    <p className="text-danger">{emailError}</p>
                  ) : null}
                </div>
                <div className="mb-100 input-group">
                  <InputGroup className="mb-3">
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
                  </InputGroup>
                  {passwordError ? (
                    <p className="text-danger">{passwordError}</p>
                  ) : null}
                </div>
                <Button
                  color="success"
                  type="submit"
                  className="btn btn-block "
                >
                  <i class="fas fa-sign-in-alt top" />
                  {isLoading ? "Please wait..." : "Log In"}
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
