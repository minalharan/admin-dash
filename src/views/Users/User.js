import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Form } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Image, FormControl } from "react-bootstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import {
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { toast } from "react-toastify";
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
      errors: {}
    };
  }
  componentDidMount = async e => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    const response = await axios.get(
      "http://192.168.2.118:8080/getuser/" + this.props.match.params.id
    );
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
    e.preventDefault();

    console.log("dfjishfoi");
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
        this.setState({ isLoading: false });
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
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          `${(error.response &&
            error.response.data &&
            error.response.data.message[0].msg) ||
            "Unknown error"}`
        );
      }
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
                <Form onSubmit={this.onSubmit} noValidate>
                  <FormGroup align="center">{$imagePreview}</FormGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="name"
                      className="tag"
                      value={this.state.name}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>

                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-phone-square" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      className="tag"
                      name="mobile_no"
                      value={this.state.mobile_no}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-user-alt" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Label for="gender" />
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
                  </InputGroup>

                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-female" />
                      </InputGroupText>
                    </InputGroupAddon>
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
                  </InputGroup>

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
                    Submit
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
