import Axios from "axios";
import Validator, { ValidationTypes } from "js-object-validation";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import LoginComponent from "../../components/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      errors: {},
      error: "",
      toastId: null
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/product-list");
    }
  }
  onLogin = async e => {
    e.preventDefault();
    this.setState({
      isLoading: true,
      errors: {}
    });
    try {
      const { email, password } = this.state;
      const obj = { email, password };
      const validations = {
        email: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EMAIL]: true
        },
        password: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        email: {
          [ValidationTypes.EMAIL]: "Please enter a valid email address.",
          [ValidationTypes.REQUIRED]: "Please enter an email address."
        },
        password: {
          [ValidationTypes.REQUIRED]: " Please  enter  a  password."
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

      const response = await Axios.post(
        "http://192.168.2.118:8080/adminLogin",
        obj
      );
      localStorage.setItem("token", response.data.token);
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.success("Login Succesfully");
      }

      localStorage.setItem("cid", response.data.result._id);
      this.props.history.push("/product-list");
    } catch (error) {
      this.setState({ isLoading: false });
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
    return (
      <LoginComponent
        email={this.state.email}
        password={this.state.password}
        isLoading={this.state.isLoading}
        errors={this.state.errors}
        onLogin={this.onLogin}
        onInputChange={this.onInputChange}
      />
    );
  }
}

export default withRouter(Login);
