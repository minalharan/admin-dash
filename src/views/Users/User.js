import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Form } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Image, FormControl } from "react-bootstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import { FormGroup, FormLabel } from "react-bootstrap";
import Swal from "sweetalert2";
const BASE_URL = "http://192.168.2.118:8080/";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile_no: "",
      file: "",
      gender: "",
      status: "",
      isOpen: false,
      disabled: true,
      enable: false,
      imageUpdated: false,
      errors: []
    };
  }
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    //  const { user } = this.state;
    const response = await axios.get(
      "http://192.168.2.118:8080/getuser/" + this.props.match.params.id
    ); //console.log(res.data.result);
    // console.log("result  :-", this.props.match.params.id);
    // const result = res.data.result1[0];
    // this.setState({ user: result });
    // console.log("users :-", result)
    this.setState({
      name: response.data.result1[0].name,
      email: response.data.result1[0].email,
      mobile_no: response.data.result1[0].mobile_no,
      gender: response.data.result1[0].gender,
      status: response.data.result1[0].status,
      file: response.data.result1[0].file
    });
    if (!response) {
      console.log("error");
    }
  };

  onSubmit = async e => {
    console.log("dfjishfoi");
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
        status,
        file,
        imageUpdated
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
            "Name field should have atleast 2 charaters."
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
      console.log(isValid);
      if (!isValid) {
        this.setState({
          errors,
          isLoading: false
        });
      }

      const data = {
        name,
        email,
        mobile_no,
        file,
        gender,
        status,
        imageUpdated
      };
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }

      const result = await axios.post(
        "http://192.168.2.118:8080/profileUpdate/" + this.props.match.params.id,
        body
      );
      if (result) {
        Swal.fire({
          type: "success",
          title: "Success",
          text: "Changes save!"
        });
        this.props.history.push("/users");
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
  onChangefile = e => {
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
  handleClose = e => {
    this.setState({ show: false });
  };
  handleOpen = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleShow = e => {
    this.setState({ show: true });
  };
  isEnable = e => {
    this.setState({ disabled: !this.state.disabled, enable: true });
  };

  render() {
    const { errors } = this.state;
    const {
      name: nameError,
      email: emailError,
      password: passwordError,
      cpassword: cpasswordError,
      mobile_no: mobile_noError,
      gender: genderError
    } = errors;

    let { imagePreviewUrl, file } = this.state;
    let $imagePreview = (
      <Image
        src={BASE_URL + this.state.file}
        width="150px"
        height="160"
        align="center"
        roundedCircle
      />
    );
    if (imagePreviewUrl) {
      $imagePreview = (
        <Image
          src={imagePreviewUrl}
          width="150px"
          height="160"
          align="center"
          roundedCircle
        />
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={8} className="user-updated">
            <Card>
              <CardBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup align="center">{$imagePreview}</FormGroup>
                  <FormGroup>
                    <FormLabel> Name</FormLabel>
                    <FormControl
                      type="text"
                      name="name"
                      className="tag"
                      value={this.state.name.toLowerCase()}
                      onChange={this.onInputChange}
                    />
                    {nameError ? (
                      <p className={"text-danger"}>{nameError}</p>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      type="text"
                      name="email"
                      className="tag"
                      value={this.state.email}
                      onChange={this.onInputChange}
                    />
                    {emailError ? (
                      <p className={"text-danger"}>{emailError}</p>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl
                      type="text"
                      className="tag"
                      name="mobile_no"
                      value={this.state.mobile_no}
                      onChange={this.onInputChange}
                    />
                    {mobile_noError ? (
                      <p className={"text-danger"}>{mobile_noError}</p>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Gender</FormLabel>
                    <FormControl
                      as="select"
                      name="gender"
                      className="tag"
                      value={this.state.gender}
                      onChange={this.onInputChange}
                    >
                      {/* <option value={""}>- Gender-</option> */}
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"other"}>Other</option>
                    </FormControl>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Status</FormLabel>
                    <FormControl
                      as="select"
                      name="status"
                      value={this.state.status}
                      className="tag"
                      onChange={this.onInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </FormControl>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl
                      type="file"
                      className="tag"
                      name="file"
                      onChange={this.onChangefile}
                    />
                  </FormGroup>

                  <Button
                    variant="primary"
                    type="submit"
                    className="image3"
                    align="center"
                    style={{ width: "100px", padding: "5px" }}
                  >
                    <i class="fas fa-save top" />
                    Save
                  </Button>
                  <Button
                    variant="danger"
                    style={{ width: "100px", padding: "5px" }}
                    className="image"
                    align="center"
                    onClick={() => {
                      this.props.history.push("/users");
                    }}
                  >
                    Cancel
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;
