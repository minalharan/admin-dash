import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Form,
  FormGroup
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Image, FormControl } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Swal from "sweetalert2";
const BASE_URL = "http://192.168.2.118:8080/";
class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      thumbnail: "",
      otherImg: [],
      status: "",
      imageUpdated: false,
      imagePreviewUrl: "",
      isOpen: false,
      disabled: true,
      enable: false,
      category: "",
      categoryValue: [],
      categoryN: "",
      des: "",
      quantity: "",
      imageUpdated1: false,
      toastId: null
    };
  }

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    try {
      const response = await axios.get(
        "http://192.168.2.118:8080/getItem/" + this.props.match.params.id
      );

      this.setState({
        name: response.data.result.name,
        price: response.data.result.price,
        thumbnail: response.data.result.thumbnail,
        status: response.data.result.status,
        category: response.data.result.category,
        des: response.data.result.des,
        quantity: response.data.result.quantity,
        otherImg: response.data.result.otherImg
      });
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
      const { category } = this.state;
      const data = { category };
      const result = await axios.post(
        "http://192.168.2.118:8080/getCategory",
        data
      );
      this.setState({
        categoryN: result.data.result[0].category
      });
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = async e => {
    e.preventDefault();

    try {
      const {
        name,
        price,
        thumbnail,
        imageUpdated,
        imageUpdated1,
        status,
        category,
        des,
        quantity,
        otherImg
      } = this.state;

      const data = {
        name,
        price,
        thumbnail,
        imageUpdated,
        imageUpdated1,
        status,
        category,
        des,
        quantity,
        otherImg
      };

      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }
      const response = await axios.post(
        "http://192.168.2.118:8080/editItem/" + this.props.match.params.id,
        body
      );
      Swal.fire({
        type: "success",
        title: "Success",
        text: "Product updated Successfully !"
      });
      this.props.history.push("/product-list");
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
  onChangeCategory = e => {
    this.setState({
      category: e.target.value
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

  handleClose = e => {
    this.setState({ show: false });
  };
  handleOpen = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  fileSelected = e => {
    var n = 0;
    var abc = [];
    for (n = 0; n < e.target.files.length; n++) {
      abc[n] = e.target.files[n] ? e.target.files[n] : null;
      this.setState({
        otherImg: abc[n],
        imageUpdated1: true
      });
    }
  };

  handleShow = e => {
    this.setState({ show: true });
  };
  isEnable = e => {
    this.setState({ disabled: !this.state.disabled, enable: true });
  };

  render() {
    let { imagePreviewUrl, categoryValue } = this.state;
    let $imagePreview = (
      <Image
        src={BASE_URL + this.state.thumbnail}
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
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-key" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className="tag"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa fa-tag" aria-hidden="true" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className="tag"
                      type="text"
                      name="price"
                      value={this.state.price}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa fa-circle" aria-hidden="true" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormControl
                      as="select"
                      className="tag"
                      name="status"
                      value={this.state.status}
                      onChange={this.onInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </FormControl>
                  </InputGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-list" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormControl
                      as="select"
                      className="tag"
                      name="category"
                      value={this.state.category}
                      onChange={this.onInputChange}
                    >
                      {categoryValue && categoryValue.length
                        ? categoryValue.map(Category => {
                            return (
                              <option value={Category._id}>
                                {Category.category}
                              </option>
                            );
                          })
                        : null}
                    </FormControl>
                  </InputGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-info-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="des"
                      className="tag"
                      value={this.state.des}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa fa-tag" aria-hidden="true" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="number"
                      name="quantity"
                      className="tag"
                      value={this.state.quantity}
                      onChange={this.onInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="far fa-image" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="file"
                      className="tag"
                      name="thumbnail"
                      onChange={this.onChangefile}
                    />
                  </InputGroup>
                  <InputGroup className="user12">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-images" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className="tag"
                      type="file"
                      name="otherImg"
                      onChange={this.fileSelected}
                      multiple
                    />
                  </InputGroup>

                  <Button
                    variant="primary"
                    className="image3"
                    type="submit"
                    style={{ width: "100px", padding: "5px" }}
                  >
                    <i class="fas fa-save top" />
                    Save
                  </Button>
                  <Button
                    variant="danger"
                    align="center"
                    style={{ width: "100px", padding: "5px" }}
                    onClick={() => {
                      this.props.history.goBack();
                    }}
                    className="image"
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

export default Update;
