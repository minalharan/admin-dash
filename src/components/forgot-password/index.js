import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button
} from "reactstrap";
class ForgotComponent extends Component {
  render() {
    const { email, isLoading, errors } = this.props;
    const { email: emailError } = this.props.errors;
    return (
      <div className="login_loginContainer__2JMrT">
        <form
          onSubmit={this.props.sendEmail}
          noValidate
          className="login_formSignin__27WMl"
        >
          <h2 align="center">Forgot Password</h2>
          <br />
          <ToastContainer />
          <div>
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
                  value={email}
                  onChange={this.props.handleChange("email")}
                />
              </InputGroup>
              {emailError ? <p className=" text-danger">{emailError}</p> : null}
            </div>
            <div>
              <Button color="info" type="submit" className="btn  btn-block ">
                {" "}
                {isLoading ? "please wait.." : "Submit"}
              </Button>
            </div>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp;
          <Link to={"/login"} align="center">
            <Button className="btn btn-dark btn-block">Cancel</Button>
          </Link>
        </form>
      </div>
    );
  }
}
export default ForgotComponent;
