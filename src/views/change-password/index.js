import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
import ResetComponent from "../../components/reset-password";

import {
  Button,
  FormLabel,
  FormGroup,
  FormControl,
  Row,
  Col
} from "react-bootstrap";
const BASE_URL = "http://192.168.2.107:8080";
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
          [ValidationTypes.REQUIRED]: "Please enter old password."
        },
        newPassword: {
          [ValidationTypes.REQUIRED]: "Please enter new password.",
          [ValidationTypes.MINLENGTH]: "Please enter at least 6 characters."
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: "Please enter confirm password.",
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
        "http://192.168.2.107:8080/changePassword",
        data
      );
      console.log(response);

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
      console.log(error.response.data);
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Password didn't match !"
      });
      this.setState({
        updated: false,
        isLoading: false,
        error: true
      });
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
      <div className="login_loginContainer__2JMrT">
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
            <FormGroup>
              <FormControl
                required="true"
                type="password"
                placeholder="Enter old password.."
                name="oldPassword"
                onChange={this.onInputChange}
                className="a"
              />
              {oldPasswordError ? (
                <p className=" text-danger">{oldPasswordError}</p>
              ) : null}
            </FormGroup>
          </div>
          <div className="input-group">
            <FormGroup>
              <FormControl
                required="true"
                type="password"
                placeholder="Enter new password.."
                name="newPassword"
                onChange={this.onInputChange}
                className="a"
              />
              {newPasswordError ? (
                <p className=" text-danger">{newPasswordError}</p>
              ) : null}
            </FormGroup>
          </div>
          <div className="input-group">
            <FormGroup>
              <FormControl
                required="true"
                type="password"
                placeholder="Enter confirm password"
                name="cpassword"
                onChange={this.onInputChange}
                className="a"
              />
              {cpasswordError ? (
                <p className=" text-danger">{cpasswordError}</p>
              ) : null}
            </FormGroup>
          </div>
          <Button type="submit" className="image">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
export default ChangePassword;
