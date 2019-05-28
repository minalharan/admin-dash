import React, { Component } from "react";
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  Button,
  FormControl,
  Container,
  Row,
  Col
} from "react-bootstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { MDBBtn } from "mdbreact";
const BASE_URL = "http://192.168.2.118:8080";

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
      files: [],
      quantity: "",
      des: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login1");
    }
    axios.get("http://192.168.2.118:8080/getCategory").then(res => {
      const result = res.data;
      const option = [];
      if (result.result1 && result.result1.length) {
        console.log("in if");
      }
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
      const {
        name,
        price,
        thumbnail,
        category,
        otherImg,
        quantity,
        des
      } = this.state;

      const obj = { name, price, category, quantity, des };
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
        },
        quantity: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true
        },
        des: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        name: {
          [ValidationTypes.REQUIRED]: "Please enter the name of product."
        },
        price: {
          [ValidationTypes.REQUIRED]: "Please Enter the price of product.",
          [ValidationTypes.NUMERIC]: "Must be a number."
        },
        thumbnail: {
          [ValidationTypes.REQUIRED]: "Please select main image."
        },
        category: {
          [ValidationTypes.REQUIRED]: "Please select category."
        },
        quantity: {
          [ValidationTypes.REQUIRED]: "Please enter quantity.",
          [ValidationTypes.NUMERIC]: "Must be a number."
        },
        des: {
          [ValidationTypes.REQUIRED]: "Please enter details of product."
        }
      };
      const { isValid, errors } = Validator(obj, validations, messages);
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
        category,
        otherImg,
        quantity,
        des
      };

      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }

      const response = await axios.post(
        " http://192.168.2.118:8080/addProduct",
        body
      );
      toast.info("product added successfully!");
      this.props.history.push("/product-list");
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
  fileSelected = e => {
    var n = 0;
    var abc = [];
    for (n = 0; n < e.target.files.length; n++) {
      abc[n] = e.target.files[n] ? e.target.files[n] : null;
      this.setState({
        otherImg: abc[n]
      });
    }
  };
  handleClick = e => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    const {
      errors,
      category,
      categoryValue,
      name,
      price,
      otherImg,
      quantity,
      des
    } = this.state;
    const {
      name: nameError,
      price: priceError,
      thumbnail: thumbnailError,
      category: categoryError,
      quantity: quantityError,
      des: desError
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
    return (
      <>
        <Row className="login_formSignin__27WMl auth-box0">
          <Container>
            <h3 align="center" className="bottom">
              Add Product
            </h3>

            <form onSubmit={this.onSubmit} noValidate>
              <FormGroup>
                <FormLabel>
                  Name<span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  value={name.toLowerCase()}
                  onChange={this.onInputChange}
                />
                {nameError ? <p className="text-danger">{nameError}</p> : null}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <i class="fas fa-tag top" />
                  Price<span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="number"
                  placeholder="Product Price"
                  name="price"
                  value={price}
                  onChange={this.onInputChange}
                />

                {priceError ? (
                  <p className="text-danger">{priceError}</p>
                ) : null}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <i class="fas fa-tag top" />
                  Quantity<span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="number"
                  placeholder="Qunatity"
                  name="quantity"
                  value={quantity}
                  onChange={this.onInputChange}
                />

                {quantityError ? (
                  <p className="text-danger">{quantityError}</p>
                ) : null}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <i class="fa fa-info-circle top" aria-hidden="true" />
                  Description<span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="Product Details"
                  name="des"
                  value={des}
                  onChange={this.onInputChange}
                />

                {desError ? <p className="text-danger">{desError}</p> : null}
              </FormGroup>
              <FormLabel>
                <i class="fas fa-list-alt top" />
                Category
                <span className="required">*</span>
              </FormLabel>
              <FormGroup margin="normal">
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
                  <p className="text-danger">{categoryError}</p>
                ) : null}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <i class="far fa-file-image top" />
                  Image<span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="file"
                  placeholder="product Image"
                  name="thumbnail"
                  onChange={this.onChangefile}
                  className="auth-box"
                />
                {thumbnailError ? (
                  <p className="text-danger">{thumbnailError}</p>
                ) : null}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <i class="far fa-file-image top" />
                  Images<span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="file"
                  placeholder="product Image"
                  name="otherImg"
                  onChange={this.fileSelected}
                  className="auth-box"
                  multiple
                />
              </FormGroup>

              <FormGroup align="center">
                <div className="imgPreview">{$imagePreview}</div>
              </FormGroup>
              <br />

              <Button variant="success" type="submit" className="btn btn-block">
                <i class="fas fa-plus top" />
                Add Product
              </Button>
              <br />

              <Button
                variant="danger"
                className="image"
                className="btn btn-block"
                onClick={() => {
                  this.props.history.push("/product-list");
                }}
              >
                Cancel
              </Button>
              <br />
            </form>
          </Container>
        </Row>
      </>
    );
  }
}
export default AddProduct;
