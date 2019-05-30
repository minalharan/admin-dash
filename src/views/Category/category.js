import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Form } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import Validator, { ValidationTypes } from "js-object-validation";
const BASE_URL = "http://192.168.2.118:8080/";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      status: "",
      errors: [],
      isOpen: false,
      disabled: true,
      enable: false,
      imageUpdated: false
    };
  }
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    const response = await axios.get(
      "http://192.168.2.118:8080/getCategory/" + this.props.match.params.id
    );
    this.setState({
      category: response.data.result1[0].category,
      status: response.data.result1[0].status
    });
    if (!response) {
      console.log("error");
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    try {
      const { category, status } = this.state;
      const obj = { category, status };
      const validations = {
        category: {
          [ValidationTypes.REQUIRED]: true
        },
        status: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        category: {
          [ValidationTypes.REQUIRED]: "Category is required."
        },
        status: {
          [ValidationTypes.REQUIRED]: "Status is required."
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
      // const { category, status } = this.state;

      const data = {
        status,
        category
      };
      const result = await axios.post(
        "http://192.168.2.118:8080/editCategory/" + this.props.match.params.id,
        data
      );
      if (result) {
        Swal.fire({
          type: "success",
          title: "Success",
          text: "Changes save!"
        });
        this.props.history.push("/category-list");
      }
    } catch (error) {}
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
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
    const { isLoading, errors } = this.state;
    const { category: categoryError, status: statusError } = errors;
    if (this.state.disabled === true) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <strong>
                    <i className="icon-info pr-1" />
                    Category id: {this.props.match.params.id}
                  </strong>
                  <Link onClick={this.isEnable} align="right">
                    <i
                      class="fas fa-user-edit top"
                      style={{ paddingLeft: 110 }}
                    />
                    Edit
                  </Link>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Table responsive striped hover>
                      <tbody>
                        {/* <tr align="center">
                          <th scope="row" colSpan="2">{$imagePreview}</th>
                        </tr> */}
                        <tr>
                          <th scope="row">Name</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="category"
                              value={this.state.category}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>

                        <tr>
                          <th scope="row">Status</th>
                          <th scope="row">
                            <select
                              name="status"
                              value={this.state.status}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                              <option value="Banned">Banned</option>
                            </select>
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
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            <Button
                              color="danger"
                              className="image"
                              align="center"
                              style={{ width: "100px", padding: "5px" }}
                              onClick={() => {
                                this.props.history.push("/category-list");
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
                <CardHeader>
                  <strong>
                    <i className="icon-info pr-1" />
                    Category id: {this.props.match.params.id}
                  </strong>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Table responsive striped hover>
                      <tbody>
                        <tr>
                          <th scope="row">Name</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="category"
                              value={this.state.category}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />{" "}
                            {categoryError ? (
                              <p className="text-danger">{categoryError}</p>
                            ) : null}
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Status</th>
                          <th scope="row">
                            <select
                              name="status"
                              value={this.state.status}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                              <option value="Banned">Banned</option>
                            </select>
                            {statusError ? (
                              <p className="text-danger">{statusError}</p>
                            ) : null}
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
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            <Button
                              color="danger"
                              className="image"
                              align="center"
                              style={{ width: "100px", padding: "5px" }}
                              onClick={() => {
                                this.props.history.push("/category-list");
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

export default Category;
