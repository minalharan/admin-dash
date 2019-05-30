import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Validator, { ValidationTypes } from "js-object-validation";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { toast } from "react-toastify";
const BASE_URL = "http://192.168.2.118:8080";
class ChangePassword extends Component {
  constructor() {
    super();

    this.state = {
      newPassword: "",
      cpassword: "",
      oldPassword: "",
      Cid: localStorage.getItem("cid"),
      updated: false,
      isLoading: true,
      error: false,
      errors: {}
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
  }
  onSubmit = async e => {
    e.preventDefault();
    try {
      const { cpassword, Cid, newPassword, oldPassword } = this.state;
      const obj = { oldPassword, newPassword, cpassword };
      const validations = {
        oldPassword: {
          [ValidationTypes.REQUIRED]: true
        },
        newPassword: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 6
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EQUAL]: "newPassword"
        }
      };
      const messages = {
        oldPassword: {
          [ValidationTypes.REQUIRED]: "Please enter an old password."
        },
        newPassword: {
          [ValidationTypes.REQUIRED]: "Please enter a new password.",
          [ValidationTypes.MINLENGTH]: "Please enter at least 6 characters."
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: "Please enter a confirm password.",
          [ValidationTypes.EQUAL]: "Password and confirm password didn't match."
        }
      };
      const { isValid, errors } = Validator(obj, validations, messages);
      if (!isValid) {
        this.setState({
          errors,
          isLoading: false
        });
        return;
      }
      const data = { cpassword, Cid, newPassword, oldPassword };

      const response = await axios.post(
        "http://192.168.2.118:8080/changePassword",
        data
      );
      if (response.data.success === "true") {
        this.setState({
          newPassword: "",
          oldPassword: "",
          cpassword: ""
        });
      }
      Swal.fire({
        type: "success",
        title: "success...",
        text: "password changed successfully !"
      });
      this.props.history.push("/product-list");
    } catch (error) {
      this.setState({
        updated: false,
        isLoading: false,
        error: true
      });
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          `${(error.response &&
            error.response.data &&
            error.response.data.message) ||
            "Unknown Error"}`
        );
      }
    }
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };

  render() {
    const { errors } = this.state;
    const {
      oldPassword: oldPasswordError,
      newPassword: newPasswordError,
      cpassword: cpasswordError
    } = errors;

    return (
      <div className="login_loginContainer__2JMrT2  auth-box0">
        <form
          className="password-form"
          onSubmit={this.onSubmit}
          noValidate
          className="login_formSignin__27WMl"
        >
          <div>
            <h1 className="center" className="h">
              Change Password
            </h1>
          </div>
          <div className="input-group">
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-key" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                required="true"
                type="password"
                placeholder="Enter old password"
                name="oldPassword"
                onChange={this.onInputChange}
              />
            </InputGroup>
            {oldPasswordError ? (
              <p className=" text-danger">{oldPasswordError}</p>
            ) : null}
          </div>
          <div className="input-group">
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-key" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                required="true"
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                onChange={this.onInputChange}
              />
            </InputGroup>{" "}
            {newPasswordError ? (
              <p className=" text-danger">{newPasswordError}</p>
            ) : null}
          </div>
          <div className="input-group">
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-key" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                required="true"
                type="password"
                placeholder="Enter confirm password"
                name="cpassword"
                onChange={this.onInputChange}
              />
            </InputGroup>{" "}
            {cpasswordError ? (
              <p className=" text-danger">{cpasswordError}</p>
            ) : null}
          </div>
          <Button color="info" type="submit">
            Submit
          </Button>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          &nbsp;&nbsp; &nbsp;&nbsp;
          <Button
            color="danger"
            onClick={() => {
              this.props.history.push("/product-list");
            }}
          >
            {" "}
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}
export default ChangePassword;
