import React, { Component } from "react";
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  Button,
  FormControl,
  Container,
  Row
} from "react-bootstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
import { MDBBtn } from "mdbreact";
class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
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
      const { category } = this.state;

      const obj = {
        category
      };
      const validations = {
        category: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        category: {
          [ValidationTypes.REQUIRED]: "Please enter the name of the category."
        }
      };
      const { isValid, errors } = Validator(obj, validations, messages);
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      //const { category } = this.state;
      const data = { category };
      const response = await axios.post(
        "http:///192.168.2.118:8080/category",
        data
      );
      toast.success("Category added !");
    } catch (error) {
      toast.error(
        `${(error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Unknown error"}`
      );
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
    const { errors, category } = this.state;
    const { category: categoryError } = errors;

    return (
      <div className="login_loginContainer__2JMrT ">
        <Row className="login_formSignin__27WMl">
          <Container>
            <h3 align="center">Add Category</h3>
            <form onSubmit={this.onSubmit} noValidate>
              <FormGroup>
                <FormLabel>
                  Name <span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="category name"
                  name="category"
                  value={this.state.category}
                  onChange={this.onInputChange}
                />
                {categoryError ? (
                  <p className="text-danger">{categoryError}</p>
                ) : null}
              </FormGroup>

              <Button
                variant="outline-success"
                type="submit"
                className="animate"
              >
                <i class="fas fa-plus top" />
                Add Category
              </Button>
              <div />
              <br />
            </form>
          </Container>
        </Row>
      </div>
    );
  }
}
export default AddCategory;
