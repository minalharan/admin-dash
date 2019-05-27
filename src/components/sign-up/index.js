import React, { Component } from "react";
import {
  Button,
  Label,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.State = {};
  }

  render() {
    const { isLoading } = this.props;
    const {
      name: nameError,
      email: emailError,
      password: passwordError,
      cpassword: cpasswordError,
      mobile_no: mobile_noError,
      gender: genderError
    } = this.props.errors;

    return (
      <div className="auth-box0">
        <div className="login_loginContainer__2JMrT1a">
          {/* <div className="app flex-row align-items-center" > */}
          {/* <Container className=""> */}
          {/* <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4"  style={{ marginTop: "50px" }}>
                  <CardBody className="p-4"  container1> */}

          <Form
            onSubmit={this.props.onRegister}
            noValidate
            className="login_formSignin__27WMl"
          >
            <h1>Register</h1>

            <p className="text-muted">Create your account</p>

            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-key left key" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                onChange={this.props.onInputChange}
              />
              {nameError ? <p style={{ color: "red" }}>{nameError}</p> : null}
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                autoComplete="email"
                onChange={this.props.onInputChange}
              />
              {emailError ? <p style={{ color: "red" }}>{emailError}</p> : null}
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-key" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="password"
                onChange={this.props.onInputChange}
              />
              {passwordError ? (
                <p style={{ color: "red" }}>{passwordError}</p>
              ) : null}
            </InputGroup>

            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-lock" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                name="cpassword"
                placeholder="Re-type password"
                autoComplete="password"
                onChange={this.props.onInputChange}
              />
              {cpasswordError ? (
                <p style={{ color: "red" }}>{cpasswordError}</p>
              ) : null}
            </InputGroup>

            <Row>
              <Col md="9" lg="7" xl="6">
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-phone-square" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="Number"
                    name="mobile_no"
                    placeholder="Mobile no."
                    autoComplete="mobile_no"
                    onChange={this.props.onInputChange}
                  />
                  {mobile_noError ? (
                    <p style={{ color: "red" }}>{mobile_noError}</p>
                  ) : null}
                </InputGroup>
              </Col>
              <Col md="9" lg="7" xl="6">
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-female" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Label for="gender" />
                  <Input
                    type="select"
                    name="gender"
                    id="gender"
                    onChange={this.props.onInputChange}
                  >
                    <option value={""}>- Gender-</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option value={"other"}>Other</option>
                  </Input>
                  {genderError ? (
                    <p style={{ color: "red" }}>{genderError}</p>
                  ) : null}
                </InputGroup>
              </Col>
            </Row>
            <InputGroup className="mb-3">
              <Label for="file"> Upload your picture </Label>
              <Input
                type="file"
                autoComplete="file"
                onChange={this.props.onfileChange}
              />
            </InputGroup>

            <InputGroup>
              <div className="imgPreview preview" align="center">
                {this.props.$imagePreview}
              </div>
            </InputGroup>

            <Button color="success" block>
              {isLoading ? "please wait.." : "Create Account"}
            </Button>
          </Form>

          {/* </CardBody>
                </Card>
              </Col>
            </Row> */}
          {/* </Container> */}
        </div>
      </div>
    );
  }
}

export default SignupComponent;
