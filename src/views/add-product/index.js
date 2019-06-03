import React, { Component } from "react";
import axios from "axios";
import { Card, CardBody, Col, Button } from "reactstrap";
import {
  Label,
  Container,
  Row,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
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
      des: "",
      toastId: null
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
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 2
        },
        price: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true,
          [ValidationTypes.MAXLENGTH]: 5
        },
        thumbnail: {
          [ValidationTypes.REQUIRED]: true
        },
        category: {
          [ValidationTypes.REQUIRED]: true
        },
        quantity: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true,
          [ValidationTypes.MAXVALUE]: 200
        },
        des: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MAXLENGTH]: 1000
        }
      };
      const messages = {
        name: {
          [ValidationTypes.REQUIRED]: "Please enter the name of product.",
          [ValidationTypes.MINLENGTH]:
            "Name field should have atleast 2 charaters."
        },
        price: {
          [ValidationTypes.REQUIRED]: "Please enter the price of product.",
          [ValidationTypes.NUMERIC]: "Must be a number.",
          [ValidationTypes.MAXLENGTH]:
            "You can't add product of price  more then $1000."
        },
        thumbnail: {
          [ValidationTypes.REQUIRED]: "Please select main image."
        },
        category: {
          [ValidationTypes.REQUIRED]: "Please select category."
        },
        quantity: {
          [ValidationTypes.REQUIRED]: "Please enter quantity.",
          [ValidationTypes.NUMERIC]: "Must be a number.",
          [ValidationTypes.MAXVALUE]: "Qunatity shouldn't be more then 200."
        },
        des: {
          [ValidationTypes.REQUIRED]: "Please enter the details of product.",
          [ValidationTypes.MAXLENGTH]:
            "Description shouldn't have within 1000 charaters."
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
          console.log(data[i]);
          console.log("data[i]");
          console.log(element);

          body.append(i, element);
        }
      }
      console.log(body);
      console.log("///////////////////");

      const response = await axios.post(
        " http://192.168.2.118:8080/addProduct",
        body
      );
      toast.info("product added successfully!");
      this.props.history.push("/product-list");
    } catch (error) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          `${(error.response &&
            error.response.data &&
            error.response.data.message) ||
            "Unknown error"}`
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
        <Row>
          <Col lg={8} className="user-updated">
            <Card>
              <CardBody>
                <form onSubmit={this.onSubmit} noValidate>
                  <h1>Add Product</h1>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-key" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Product Name"
                      name="name"
                      value={name}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>
                  {nameError ? (
                    <p className="text-danger">{nameError}</p>
                  ) : null}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-tag top" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="number"
                      placeholder="Product Price"
                      name="price"
                      value={price}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>
                  {priceError ? (
                    <p className="text-danger">{priceError}</p>
                  ) : null}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-tag top" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Qunatity"
                      name="quantity"
                      value={quantity}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>{" "}
                  {quantityError ? (
                    <p className="text-danger">{quantityError}</p>
                  ) : null}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa fa-info-circle top" aria-hidden="true" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="textarea"
                      placeholder="Product Details"
                      name="des"
                      value={des}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>{" "}
                  {desError ? <p className="text-danger">{desError}</p> : null}{" "}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-list-alt top" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="select"
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
                    </Input>
                  </InputGroup>
                  {categoryError ? (
                    <p className="text-danger">{categoryError}</p>
                  ) : null}
                  <InputGroup>
                    <Label>
                      <i class="far fa-file-image top" />
                      Image<span className="required">*</span>
                    </Label>
                    <Input
                      alt=" "
                      type="file"
                      placeholder="product Image"
                      name="thumbnail"
                      onChange={this.onChangefile}
                      className="auth-box"
                    />
                  </InputGroup>
                  {thumbnailError ? (
                    <p className="text-danger">{thumbnailError}</p>
                  ) : null}
                  <InputGroup align="center">
                    <div className="imgPreview">{$imagePreview}</div>
                  </InputGroup>
                  <InputGroup>
                    <Label for="file">
                      <i class="far fa-file-image top" />
                      Other Images<span className="required">*</span>
                    </Label>
                    <Input
                      type="file"
                      alt=" "
                      placeholder="product Image"
                      name="otherImg[]"
                      onChange={this.fileSelected}
                      className="auth-box"
                      multiple
                    />
                  </InputGroup>
                  <br />
                  <Button
                    color="primary"
                    className="image3"
                    type="submit"
                    style={{ width: "100px", padding: "5px" }}
                  >
                    <i class="fas fa-save top" />
                    Save
                  </Button>
                  <Button
                    color="danger"
                    align="center"
                    style={{ width: "100px", padding: "5px" }}
                    onClick={() => {
                      this.props.history.push("/product-list");
                    }}
                    className="image"
                  >
                    Cancel
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default AddProduct;
