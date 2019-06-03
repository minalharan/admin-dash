import React, { Component } from "react";
import {
  Button,
  Label,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Card,
  CardBody
} from "reactstrap";

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
      <div>
        <div>
          <Row>
            <Col lg={8} className="user-updated">
              <Card>
                <CardBody>
                  <Form onSubmit={this.props.onRegister} noValidate>
                    <h1>Add User</h1>
                    <InputGroup className>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i class="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        autoComplete="name"
                        onChange={this.props.onInputChange}
                      />
                    </InputGroup>
                    {nameError ? (
                      <p style={{ color: "red" }}>{nameError}</p>
                    ) : null}
                    <InputGroup className>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          {" "}
                          <i class="fas fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={this.props.onInputChange}
                      />
                    </InputGroup>{" "}
                    {emailError ? (
                      <p style={{ color: "red" }}>{emailError}</p>
                    ) : null}
                    <InputGroup className>
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
                    </InputGroup>{" "}
                    {passwordError ? (
                      <p style={{ color: "red" }}>{passwordError}</p>
                    ) : null}
                    <InputGroup className>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="cpassword"
                        placeholder="Confirm Password"
                        autoComplete="password"
                        onChange={this.props.onInputChange}
                      />
                    </InputGroup>{" "}
                    {cpasswordError ? (
                      <p style={{ color: "red" }}>{cpasswordError}</p>
                    ) : null}
                    <InputGroup className>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-phone-square" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="mobile_no"
                        placeholder="Mobile no."
                        autoComplete="mobile_no"
                        onChange={this.props.onInputChange}
                      />
                    </InputGroup>{" "}
                    {mobile_noError ? (
                      <p style={{ color: "red" }}>{mobile_noError}</p>
                    ) : null}
                    <InputGroup className>
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
                    </InputGroup>{" "}
                    {genderError ? (
                      <p style={{ color: "red" }}>{genderError}</p>
                    ) : null}
                    <InputGroup className>
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
                    <Button color="info">
                      {isLoading ? "please wait.." : "Create Account"}
                    </Button>
                    <Button
                      color="danger"
                      align="center"
                      style={{ width: "100px", padding: "5px" }}
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                      className="image"
                    >
                      Cancel
                    </Button>
                  </Form>
                </CardBody>
              </Card>

              {/* </CardBody>
                </Card>
              </Col>
            </Row> */}
              {/* </Container> */}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default SignupComponent;
