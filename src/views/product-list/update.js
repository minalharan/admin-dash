import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Form } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
const BASE_URL = "http://192.168.2.107:8080/";
class Update extends Component {
  constructor(props) {
    super(props);
    this.onDrop = files => {
      this.setState({ files });
    };
    this.state = {
      name: "",
      price: "",
      thumbnail: "",
      otherImg: "",
      status: "",
      imageUpdated: false,
      imagePreviewUrl: "",
      isOpen: false,
      disabled: true,
      enable: false,
      category: "",
      categoryValue: [],
      categoryN: "",
      files: [],
      des: "",
      quantity: ""
    };
  }

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    try {
      const response = await axios.get(
        "http://192.168.2.107:8080/getItem/" + this.props.match.params.id
      );
      console.log(response);

      this.setState({
        name: response.data.result.name,
        price: response.data.result.price,
        thumbnail: response.data.result.thumbnail,
        status: response.data.result.status,
        category: response.data.result.category,
        des: response.data.result.des,
        quantity: response.data.result.quantity
      });
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
      const { category } = this.state;
      const data = { category };
      const result = await axios.post(
        "http://192.168.2.107:8080/getCategory",
        data
      );
      console.log(result);
      this.setState({
        categoryN: result.data.result[0].category
      });
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

    try {
      const {
        name,
        price,
        thumbnail,
        imageUpdated,
        status,
        category,
        des,
        quantity
      } = this.state;

      const data = {
        name,
        price,
        thumbnail,
        imageUpdated,
        status,
        category,
        des,
        quantity
      };
      //   console.log(file);
      console.log("file***********");
      console.log(data);
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }
      console.log(this.props.match.params.id);
      const result = await axios.post(
        "http://192.168.2.107:8080/editItem/" + this.props.match.params.id,
        body
      );
      console.log(result.obj);
      Swal.fire({
        type: "success",
        title: "Success",
        text: "Product updated Successfully !"
      });
      // toast.success("product updated !");
      this.props.history.push("/product-list");
    } catch (error) {
      console.log(error);
      console.log(error.result.data.message);
      toast.error(
        `${(error.result && error.result.data && error.result.data.message) ||
          "Unknown error"}`
      );
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

  handleShow = e => {
    this.setState({ show: true });
  };
  isEnable = e => {
    this.setState({ disabled: !this.state.disabled, enable: true });
  };

  render() {
    let { imagePreviewUrl, categoryValue, thumbnail, categoryN } = this.state;
    let $imagePreview = (
      <Image
        src={BASE_URL + this.state.thumbnail}
        width="150px"
        height="160"
        align="center"
        roundedCircle
        className="image"
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
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    if (this.state.disabled === true) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <strong>
                    <i className="icon-info pr-1" />
                    P_id: {this.props.match.params.id}
                  </strong>
                  <Link onClick={this.isEnable} align="right">
                    <i
                      class="fas fa-user-edit top"
                      style={{ paddingLeft: 130 }}
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
                          <th scope="row">Price</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="price"
                              value={this.state.price}
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
                          <th scope="row">category</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="category"
                              value={this.state.categoryN}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Description</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="des"
                              value={this.state.des}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        {/* <tr>
                          <th scope="row">Quantity</th>
                          <th scope="row">
                            <input
                              type="number"
                              name="quantity"
                              value={this.state.quantity}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th> */}
                        {/* </tr> */}
                        <tr>
                          <th scope="row">thumbnail</th>
                          <th scope="row">
                            <input
                              type="file"
                              name="thumbnail"
                              disabled={this.state.disabled}
                              onChange={this.onChangefile}
                            />
                          </th>
                        </tr>

                        <tr>
                          <th scope="row" colSpan="2">
                            <Button
                              variant="primary"
                              type="submit"
                              align="center"
                              disabled={this.state.disabled}
                              style={{ width: "100px", padding: "5px" }}
                            >
                              <i class="fas fa-save top" />
                              Save
                            </Button>
                            <Button
                              variant="primary"
                              className="image"
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
    if (this.state.disabled === false) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <strong>
                    <i className="icon-info pr-1" />
                    Product id: {this.props.match.params.id}
                  </strong>
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
                          <th scope="row">Price</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="price"
                              value={this.state.price}
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
                          <th scope="row">category</th>
                          <th scope="row">
                            <select
                              name="category"
                              value={this.state.category}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
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
                            </select>
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Description</th>
                          <th scope="row">
                            <input
                              type="text"
                              name="des"
                              value={this.state.des}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">Quantity</th>
                          <th scope="row">
                            <input
                              type="number"
                              name="quantity"
                              value={this.state.quantity}
                              disabled={this.state.disabled}
                              onChange={this.onInputChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">thumbnail</th>
                          <th scope="row">
                            <input
                              type="file"
                              name="thumbnail"
                              disabled={this.state.disabled}
                              onChange={this.onChangefile}
                            />
                          </th>
                        </tr>
                        {/* <Dropzone onDrop={this.onDrop}>
                          {({ getRootProps, getInputProps }) => (
                            <section className="container">
                              <div {...getRootProps({ className: "dropzone" })}>
                                <th scope="row">otherImages</th>
                                <th scope="row">
                                  <input {...getInputProps()} />
                                  <input
                                    type="file"
                                    placeholder="product Image"
                                    name="otherImg"
                                    onChange={this.onChangefile}
                                    disabled={this.state.disabled}
                                    className="auth-box c"
                                  />
                                </th>
                              </div>
                              <aside>
                                <h4>Files</h4>
                                <ul>{files}</ul>
                              </aside>
                            </section>
                          )}
                        </Dropzone> */}
                        <tr>
                          <th scope="row" colSpan="2">
                            <Button
                              variant="primary"
                              type="submit"
                              align="center"
                              disabled={this.state.disabled}
                              style={{ width: "100px", padding: "5px" }}
                            >
                              <i class="fas fa-save top" />
                              Save
                            </Button>
                            <Button
                              variant="primary"
                              align="center"
                              style={{ width: "100px", padding: "5px" }}
                              onClick={() => {
                                this.props.history.push("/product-list");
                              }}
                              className="image"
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

export default Update;
