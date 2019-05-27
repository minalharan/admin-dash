import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {
  Image,
  Button,
  FormControl,
  FormGroup,
  Form,
  Pagination,
  Modal,
  Container,
  FormLabel,
  ModalFooter
} from "react-bootstrap";
import { toast } from "react-toastify";
import Validator, { ValidationTypes } from "js-object-validation";
import Swal from "sweetalert2";
import axios from "axios";
const BASE_URL = "http://192.168.2.107:8080/";
//import usersData from './UsersData'

class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cid: this.props.cat._id
    };
  }
  getBadge = status => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "danger "
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "secondary"
      : "primary";
  };
  onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        "http://192.168.2.107:8080/deleteCategory/" + this.props.obj._id
      );
      this.props.history.push("/cat-list");
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = async () => {
    //  const { user } = this.state;
    const { Cid } = this.state;
    const data = { Cid };
    const response = await axios.post(
      "http://192.168.2.107:8080/showproductCount/",
      data
    );
    // console.log("result  :-", this.props.match.params.id);
    // const result = res.data.result1[0];
    // this.setState({ user: result });
    // console.log("users :-", result)
    this.setState({
      Cid: response.data.result
    });
    if (!response) {
      console.log("error");
    }
  };

  render() {
    return (
      <>
        {/* key={user._id.toString()} */}
        <tr>
          <th scope="row">
            <Link to={"/cat-list/" + this.props.cat._id}>
              {this.props.index + this.props.skip + 1}
            </Link>
          </th>
          <td>
            <Link to={"/cat-list/" + this.props.cat._id}>
              {this.props.cat.category}
            </Link>
          </td>
          <td>
            <Link to={"/cat-list/" + this.props.cat._id}>
              <Badge color={this.getBadge(this.props.cat.status)}>
                {this.props.cat.status}
              </Badge>
            </Link>
          </td>
          <td>{this.state.Cid}</td>
          <td>{this.props.cat.createTime}</td>
          <td>{this.props.cat.updateTime}</td>
          <td colSpan="2">
            <Link to={"/cat-list/" + this.props.cat._id}>
              <Button variant="outline-primary">
                <i class="fas fa-edit" />
              </Button>
            </Link>
            &nbsp;&nbsp;
            <Button
              variant="outline-danger"
              onClick={e =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to delete this!",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then(result => {
                  if (result.value) {
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    ) && this.props.onDelete(this.props.obj._id);
                  }
                })
              }
            >
              <i className="fas fa-trash-alt" />
            </Button>
          </td>
        </tr>
      </>
    );
  }
}

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: [],
      name: "",
      order: "",
      status: "",
      currentPage: 1,
      totalPageRec: 0,
      pageLimit: 1,
      skip: 0,
      show: false,
      value: "",
      isOpen: false,
      errors: {}
    };
  }
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login1");
    }

    this.getData();
  };
  onSubmit1 = async e => {
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
          [ValidationTypes.REQUIRED]: "Please enter the name of category."
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
      //const { category } = this.state;
      const data = { category };
      const response = await axios.post(
        "http:///192.168.2.107:8080/category",
        data
      );
      console.log("response");
      console.log(response);
      // this.setState({ category: "" });
      toast.success("Category added !");

      console.log(response);
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

  getData = async () => {
    const { currentPage, pageLimit } = this.state;
    const skip = (currentPage - 1) * pageLimit;
    const limit = pageLimit;
    const obj = { skip, limit };
    const res = await axios.post("http://192.168.2.107:8080/showCat1");
    var count = res.data.result;
    if (count % pageLimit != 0) {
      const a = count % pageLimit;
      const b = pageLimit - a;
      count = count + b;
    }
    this.setState({ totalPageRec: count });
    const response = await axios.post("http://192.168.2.107:8080/getCat", obj);

    const result = response.data.result1;
    this.setState({ cat: result, skip });
    if (!result) {
      console.log("error");
    }
  };
  onDelete = async productId => {
    try {
      const response = await axios.delete(
        "http://192.168.2.107:8080/deleteCategory/" + productId
      );
    } catch (error) {
      console.log(error);
    }
    this.getData();
  };

  handlePageChange = (page, e) => {
    this.setState({
      currentPage: page
    });
  };

  getPaginator = () => {
    const { currentPage, totalPageRec, pageLimit } = this.state;
    let active = currentPage;
    let items = [];
    let totalPages = Math.floor(totalPageRec / pageLimit);
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => this.onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    const paginationBasic = (
      <div>
        <Pagination size="sm">{items}</Pagination>
      </div>
    );

    return paginationBasic;
  };

  onPageChange = async pageNumber => {
    console.log("Page number :-", pageNumber);
    this.setState({ currentPage: pageNumber }, this.getData);
    // console.log("pagination data: ", res);
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ cat: "" });
    const { name, order, status } = this.state;

    const data = { name, order, status };

    const response = await axios.post(
      "http://192.168.2.107:8080/getCatByNamee",
      data
    );
    if (response) {
      this.setState({ name: "", order: "", status: "" });
      const result = response.data.result1;
      this.setState({ cat: result });
    }
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

  handleShow = e => {
    this.setState({ show: true });
  };
  handleOpen = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {
      cat,
      category,
      order,
      currentPage,
      skip,
      status,
      errors
    } = this.state;
    const { category: categoryError } = errors;

    console.log("userssss  ", cat);

    // const userList = usersData.filter((user) => user.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Button className="header" onClick={this.handleShow}>
            {" "}
            <i class="fa fa-plus top" aria-hidden="true" />
            Add Category
          </Button>
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            className="animate"
          >
            <form onSubmit={this.onSubmit1} noValidate>
              <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <div className="input-group">
                    <FormGroup className="mb-3">
                      <FormControl
                        className="rig"
                        type="text"
                        placeholder="Category Name"
                        name="category"
                        value={this.state.category}
                        onChange={this.onInputChange}
                      />
                      {categoryError ? (
                        <p className="text-danger">{categoryError}</p>
                      ) : null}
                    </FormGroup>

                    <div />
                    <br />
                  </div>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-success"
                  type="submit"
                  // className="image3"
                >
                  <i class="fas fa-plus top" />
                  Add Category
                </Button>{" "}
              </Modal.Footer>
            </form>
          </Modal>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup inline>
                  <Form onSubmit={this.onSubmit} inline>
                    <i className="fa fa-align-justify" />
                    &nbsp;&nbsp;
                    <Link onClick={this.getData}> Category List </Link>
                    &nbsp;&nbsp;
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Search by name"
                      value={category}
                      onChange={this.onInputChange}
                      className="mr-sm-2 filter"
                    />
                    &nbsp;
                    <FormControl
                      as="select"
                      name="order"
                      value={order}
                      onChange={this.onInputChange}
                      className="mr-sm-2 filter"
                    >
                      <option value={null}>---Name---</option>
                      <option value="assending">Order By Name A to Z</option>
                      <option value="desending">Order By Name Z to A</option>
                    </FormControl>
                    &nbsp;
                    <FormControl
                      as="select"
                      name="status"
                      value={status}
                      onChange={this.onInputChange}
                      className="mr-sm-2 filter"
                    >
                      <option value={null}>---Status---</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                      <option value="Banned">Banned</option>
                    </FormControl>
                    &nbsp;
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="filter"
                      // style={{ width: "100px", padding: "5px" }}
                    >
                      <i class="fas fa-search" />
                      Search
                    </Button>
                    &nbsp;&nbsp;
                    <i
                      class="fa fa-refresh"
                      aria-hidden="true"
                      className="filter"
                      onClick={this.getData}
                    />
                  </Form>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total Product</th>
                      <th scope="col">Create Time</th>
                      <th scope="col">Update Time</th>
                      <th scope="col" colSpan="2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat && cat.length
                      ? cat.map((cat, index) => (
                          <UserRow
                            obj={cat}
                            key={cat._id}
                            cat={cat}
                            index={index}
                            skip={this.state.skip}
                            onDelete={this.onDelete}
                          />
                        ))
                      : null}
                  </tbody>
                </Table>
              </CardBody>
              <CardHeader>
                <div style={{ marginLeft: "40%", marginTop: "3%" }}>
                  {this.getPaginator()}
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(CategoryList);
