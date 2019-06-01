import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Form } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
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

    return (
      <div className="animated fadeIn">
        <Row>
          <Col className="category-update" lg={6}>
            <Card>
              <CardBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <FormLabel> Name</FormLabel>
                    <FormControl
                      id="name"
                      name="category"
                      value={this.state.category}
                      autoComplete="username"
                      onChange={this.onInputChange}
                    />
                    {categoryError ? (
                      <p className={"text-danger"}>{categoryError}</p>
                    ) : null}
                  </FormGroup>
                  <FormGroup margin="normal">
                    <FormLabel>Select Category</FormLabel>
                    <FormControl
                      as="select"
                      name="status"
                      value={this.state.status}
                      onChange={this.onInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </FormControl>
                    {statusError ? (
                      <p className="text-danger">{statusError}</p>
                    ) : null}
                  </FormGroup>
                  <Button
                    color="primary"
                    type="submit"
                    align="center"
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Category;
