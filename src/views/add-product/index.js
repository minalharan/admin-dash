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
import {
  Label,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { MDBBtn } from "mdbreact";

//import ToggleDisplay from "react-toggle-display";
const BASE_URL = "http://192.168.2.107:8080";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onDrop = files => {
      this.setState({ files });
    };
    this.state = {
      name: "",
      price: "",
      errors: {},
      show: false,
      category: "",
      imageUpdated: false,
      imagePreviewUrl: "",
      thumbnail: "",
      otherImg: [],
      categoryValue: [],
      files: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login1");
    }
    axios.get("http://192.168.2.107:8080/getCategory").then(res => {
      const result = res.data;
      console.log(res);
      const option = [];
      if (result.result1 && result.result1.length) {
        console.log("in if");
      }
      console.log(option);
      this.setState({
        option,
        categoryValue: result.result1
      });
    });
  }

  onChangeCategory = e => {
    this.setState({
      category: e.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    try {
      const { name, price, thumbnail, category, otherImg } = this.state;

      const obj = {
        name,
        price,
        category
      };
      const validations = {
        name: {
          [ValidationTypes.REQUIRED]: true
        },
        price: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true
        },
        thumbnail: {
          [ValidationTypes.REQUIRED]: true
        },
        category: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        name: {
          [ValidationTypes.REQUIRED]:
            "Please Give the description of the product."
        },
        price: {
          [ValidationTypes.REQUIRED]: "Please Enter the price of product.",
          [ValidationTypes.NUMERIC]: "Must be a number."
        },
        thumbnail: {
          [ValidationTypes.REQUIRED]:
            "Please Enter the Selling price of product."
        },
        category: {
          [ValidationTypes.REQUIRED]: "please choose category."
        }
      };
      const { isValid, errors } = Validator(obj, validations, messages);
      console.log(errors);
      console.log(isValid);
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const data = {
        name,
        price,
        thumbnail,
        category
      };
      const files = Array.from(e.target.files);
      this.setState({ uploading: true });

      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }

      const formData = new FormData();
      for (const i in otherImg) {
        files.forEach((file, i) => {
          formData.append(i, file);
        });
      }
      const response = await axios.post(
        " http://192.168.2.107:8080/addProduct",
        body
      );
      toast.info("product added successfully!");
      this.props.history.push("/product-list");
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
  onChangefile = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      thumbnail: e.target.files[0] ? e.target.files[0] : null,
      imageUpdated: true
    });
    reader.onloadend = () => {
      this.setState({
        thumbnail: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };
  handleClick = e => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    const { errors, category, categoryValue } = this.state;
    console.log(errors);
    const {
      name: nameError,
      price: priceError,
      thumbnail: thumbnailError,
      category: categoryError
    } = errors;
    let { imagePreviewUrl, thumbnail } = this.state;
    let $imagePreview = (
      <img
        src={BASE_URL + this.state.thumbnail}
        width="150px"
        height="150px"
        alt="no image selected"
      />
    );
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} width="150px" height="150px" />
      );
    }
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <>
        <Row className="auth-box0">
          <Container>
            <h1>Add Product</h1>

            <p className="text-muted">Add your product </p>
            {/* <FormGroup>
              <FormLabel>Category</FormLabel>
              <FormControl
                readOnly
                value={category}
                className="bg auth-box c"
              />
            </FormGroup> */}
            <form
              onSubmit={this.onSubmit}
              className="login_formSignin__27WMl"
              noValidate
            >
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-key left key" />
                  </InputGroupText>
                </InputGroupAddon>

                <Input
                  type="text"
                  name="name"
                  placeholder="Product name"
                  autoComplete="name"
                  onChange={this.onInputChange}
                />
                {nameError ? <p style={{ color: "red" }}>{nameError}</p> : null}
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fas fa-tag" />
                  </InputGroupText>
                </InputGroupAddon>

                <Input
                  type="text"
                  name="price"
                  placeholder="Product price"
                  autoComplete="price"
                  value={this.state.price}
                  onChange={this.onInputChange}
                />

                {priceError ? (
                  <p style={{ color: "red" }}>{priceError}</p>
                ) : null}
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fas fa-list" />
                  </InputGroupText>
                </InputGroupAddon>

                <FormControl
                  as="select"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                >
                  <option value="">Select Category</option>
                  {categoryValue && categoryValue.length
                    ? categoryValue.map(Category => {
                        return (
                          <option value={Category._id}>
                            {Category.category}
                          </option>
                        );
                      })
                    : null}
                  )
                </FormControl>
                {categoryError ? (
                  <p style={{ color: "red" }}>{categoryError}</p>
                ) : null}
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fas fa-image" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="file"
                  placeholder="product Image"
                  name="thumbnail"
                  onChange={this.onChangefile}
                  className="auth-box c"
                />
                {thumbnailError ? (
                  <p className="text-danger">{thumbnailError}</p>
                ) : null}
              </InputGroup>
              {/* <FormGroup>
                <FormLabel>
                  <i class="far fa-file-image top" />
                  Image <span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="file"
                  placeholder="product Image"
                  name="otherImg"
                  onChange={this.onChangefile}
                  className="auth-box c"
                />
              </FormGroup> */}
              <Dropzone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps({ className: "dropzone" })}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i class="far fa-images" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <input {...getInputProps()} />
                        <FormControl
                          type="file"
                          placeholder="product Image"
                          name="otherImg"
                          onChange={this.onChangefile}
                          className="auth-box c"
                        />
                      </InputGroup>
                    </div>
                    <aside>
                      <h4>Files</h4>
                      <ul>{files}</ul>
                    </aside>
                  </section>
                )}
              </Dropzone>

              <FormGroup align="center">
                <div className="imgPreview">{$imagePreview}</div>
              </FormGroup>
              <br />
              <div>
                <Button
                  variant="outline-success"
                  type="submit"
                  // onClick={this.notify()}
                  className="animate"
                >
                  <i class="fas fa-plus top" />
                  Add Product
                </Button>
              </div>
              <br />
            </form>
          </Container>
        </Row>
      </>
    );
  }
}
export default AddProduct;
