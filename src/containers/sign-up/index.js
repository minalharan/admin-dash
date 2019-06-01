import React, { Component } from "react";
import axios from "axios";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
import SignupComponent from "../../components/sign-up";
const BASE_URL = "http://192.168.2.118:8080/";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      mobile_no: "",
      gender: "",
      file: "",
      imageUpdated: false,
      imagePreviewUrl: "",
      errors: {},
      isLoading: false,
      toastId: null
    };
  }

  // componentDidMount = async () => {

  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     this.props.history.push("/product-list");
  //   }
  // }

  onRegister = async e => {
    e.preventDefault();
    this.setState({
      isLoading: true,
      errors: {}
    });
    try {
      const {
        name,
        email,
        password,
        cpassword,
        mobile_no,
        gender,
        file
      } = this.state;
      const obj = { name, email, password, cpassword, mobile_no, gender };
      const validations = {
        name: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 2
        },
        email: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EMAIL]: true
        },
        password: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 6
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EQUAL]: "password"
        },
        mobile_no: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true,
          [ValidationTypes.MINLENGTH]: 7,
          [ValidationTypes.MAXLENGTH]: 14
        },
        gender: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        name: {
          [ValidationTypes.REQUIRED]: "Please enter a name.",
          [ValidationTypes.MINLENGTH]:
            "Name field should have atleast 2 charaters.",
          [ValidationTypes.MAXLENGTH]: "The length must be at max 50 characters"
        },
        email: {
          [ValidationTypes.REQUIRED]: "Please enter an email address.",
          [ValidationTypes.EMAIL]: "Please enter a valid email address."
        },
        password: {
          [ValidationTypes.REQUIRED]: "Please enter a password.",
          [ValidationTypes.MINLENGTH]: "Please enter at least 6 characters."
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: "Please enter a confirm password.",
          [ValidationTypes.EQUAL]: "Password and confirm password didn't match"
        },
        mobile_no: {
          [ValidationTypes.REQUIRED]: "Please enter mobile no.",
          [ValidationTypes.NUMERIC]: "Please enter in number",
          [ValidationTypes.MINLENGTH]: "Please enter atleast 7 digits",
          [ValidationTypes.MAXLENGTH]: "Please enter upto 14 digits"
        },
        gender: {
          [ValidationTypes.REQUIRED]: "Please select gender"
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
      const data = {
        name,
        email,
        password,
        cpassword,
        mobile_no,
        gender,
        file
      };
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }
      const response = await axios.post(
        "http://192.168.2.118:8080/addUser",
        body
      );
      console.log("response", response);
      if (response) {
        this.setState({
          name: "",
          email: "",
          password: "",
          cpassword: "",
          mobile_no: "",
          gender: "",
          file: "",
          isLoading: false
        });
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.success("You are Successfully signup");
        }
        this.props.history.push("/product-list");
      }
    } catch (error) {
      console.log("user", error.response);
      this.setState({ isLoading: false });
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          `${(error.response &&
            error.response.data &&
            error.response.data.message[0].msg) ||
            "Unknown error"}`
        );
      }
      this.props.history.push("/users");
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

  onfileChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      file: e.target.files[0] ? e.target.files[0] : null,
      imageUpdated: true
    });
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  render() {
    let { imagePreviewUrl, file } = this.state;
    let $imagePreview = (
      <img src={BASE_URL + file} alt={""} width="150px" height="150px" />
    );
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} alt={""} width="150px" height="150px" />
      );
    } else {
      $imagePreview = null;
    }

    return (
      <SignupComponent
        name={this.state.name}
        email={this.state.email}
        password={this.state.password}
        cpassword={this.state.cpassword}
        mobile_no={this.state.mobile_no}
        gender={this.state.gender}
        file={this.state.file}
        errors={this.state.errors}
        isLoading={this.state.isLoading}
        onInputChange={this.onInputChange}
        onfileChange={this.onfileChange}
        onRegister={this.onRegister}
        $imagePreview={$imagePreview}
      />
    );
  }
}
export default Signup;
