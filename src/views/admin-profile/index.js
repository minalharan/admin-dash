import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Form,
  Button
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const BASE_URL = "http://192.168.2.118:8080/";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
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
      Cid: localStorage.getItem("cid")
    };
  }
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    try {
      const { Cid } = this.state;
      const obj = { Cid };
      const response = await axios.post(
        "http://192.168.2.118:8080/profile",
        obj
      );

      this.setState({
        _id: response.data.result._id,
        name: response.data.result.name,
        email: response.data.result.email,
        mobile_no: response.data.result.mobile_no,
        gender: response.data.result.gender,
        status: response.data.result.status,
        file: response.data.result.file
      });
      if (!response) {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `${(error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Unknown error"}`
      );
    }
  };

  onSubmit = async e => {
    e.preventDefault();

    const {
      name,
      email,
      mobile_no,
      file,
      gender,
      imageUpdated,
      Cid
    } = this.state;

    const data = {
      name,
      email,
      mobile_no,
      file,
      gender,
      imageUpdated,
      Cid
    };
    const body = new FormData();
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        const element = data[i];
        body.append(i, element);
      }
    }

    const result = await axios.post(
      "http://192.168.2.118:8080/profileUpdate",
      body
    );
    if (result) {
      Swal.fire({
        type: "success",
        title: "Success",
        text: "Changes save!"
      });
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
      <img
        src={BASE_URL + this.state.file}
        width="150px"
        height="160"
        align="center"
        roundedCircle
      />
    );
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          width="150px"
          height="160"
          align="center"
          roundedCircle
        />
      );
    }
    // const { user } = this.state;
    if (this.state.disabled === true) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <Link onClick={this.isEnable}>
                    <i
                      class="fas fa-user-edit top"
                      style={{ paddingLeft: 400 }}
                    />
                    Edit
                  </Link>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Table responsive striped hover>
                      <tbody>
                        <tr align="center">
                          <th scope="row" colSpan="2">
                            {$imagePreview}
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Name</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="name"
                              value={this.state.name}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Email</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="email"
                              value={this.state.email}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Mobile</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="mobile_no"
                              value={this.state.mobile_no}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Gender</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="gender"
                              value={this.state.gender}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Status</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="status"
                              value={this.state.status}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Profile Picture</th>
                          <th scope="row">
                            <input
                              type="file"
                              name="file"
                              disabled={this.state.disabled}
                              onChange={this.onChangefile}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="2">
                            <Button
                              color="primary"
                              type="submit"
                              align="center"
                              disabled={this.state.disabled}
                              style={{ width: "100px", padding: "5px" }}
                            >
                              <i class="fas fa-save top" />
                              Save
                            </Button>
                            <Button
                              color="danger"
                              className="image"
                              align="center"
                              className="cancel"
                              style={{ width: "100px", padding: "5px" }}
                              onClick={() => {
                                this.props.history.push("/product-list");
                              }}
                            >
                              Cancel
                            </Button>
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
    if (this.state.disabled === false) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader />
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Table responsive striped hover>
                      <tbody>
                        <tr align="center">
                          <th scope="row" colSpan="2">
                            {$imagePreview}
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Name</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="name"
                              value={this.state.name}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Email</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="email"
                              value={this.state.email}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Mobile</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="mobile_no"
                              value={this.state.mobile_no}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Gender</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="gender"
                              value={this.state.gender}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Profile Picture</th>
                          <th scope="row">
                            <input
                              type="file"
                              name="file"
                              disabled={this.state.disabled}
                              onChange={this.onChangefile}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="2">
                            <Button
                              color="primary"
                              type="submit"
                              align="center"
                              disabled={this.state.disabled}
                              style={{ width: "100px", padding: "5px" }}
                            >
                              <i class="fas fa-save top" />
                              Save
                            </Button>
                            <Button
                              color="danger"
                              className="image"
                              className="cancel"
                              align="center"
                              style={{ width: "100px", padding: "5px" }}
                              onClick={() => {
                                this.props.history.push("/product-list");
                              }}
                            >
                              Cancel
                            </Button>
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default User;
