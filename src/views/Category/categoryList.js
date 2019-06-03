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
  ModalFooter,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { toast } from "react-toastify";
import Validator, { ValidationTypes } from "js-object-validation";
import Swal from "sweetalert2";
import axios from "axios";
const BASE_URL = "http://192.168.2.118:8080/";
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
  componentDidMount = async () => {
    //  const { user } = this.state;
    const { Cid } = this.state;
    const data = { Cid };
    const response = await axios.post(
      "http://192.168.2.118:8080/showproductCount/",
      data
    );
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
        <tr>
          <th scope="row">{this.props.index + this.props.skip + 1}</th>
          <td className="c">{this.props.cat.category}</td>

          <td className="product">{this.state.Cid}</td>
          <td>{this.props.cat.createTime}</td>
          <td>{this.props.cat.updateTime}</td>
          <td>
            <Badge
              style={{ fontSize: "90%" }}
              color={this.getBadge(this.props.cat.status)}
            >
              {this.props.cat.status}
            </Badge>
          </td>
          <td colSpan="2">
            <Link to={"/cat-list/" + this.props.cat._id}>
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}
              >
                <Button variant="outline-primary">
                  <i class="fas fa-pencil-alt top" />
                </Button>
              </OverlayTrigger>
            </Link>
            &nbsp;&nbsp;
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id="tooltip-top">Delete</Tooltip>}
            >
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
            </OverlayTrigger>
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
      pageLimit: 5,
      skip: 0,
      show: false,
      value: "",
      isOpen: false,
      errors: [],
      category: "",
      toastId: null
    };
  }
  componentDidMount = async e => {
    //  e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }

    this.getData();
  };
  onSubmit = e => {
    e.preventDefault();
    this.getData();
    return;
  };
  onSubmit1 = async e => {
    e.preventDefault();
    // this.setState({
    //   error: {}
    // });
    // try {
    //   const { category } = this.state;

    //   const obj = {
    //     category
    //   };
    //   const validations = {
    //     category: {
    //       [ValidationTypes.REQUIRED]: true,
    //       [ValidationTypes.MINLENGTH]: 3
    //     }
    //   };
    //   const messages = {
    //     category: {
    //       [ValidationTypes.REQUIRED]: "Please enter the name of category.",
    //       [ValidationTypes.MINLENGTH]:
    //         "Name field should have atleast 3 characters."
    //     }
    //   };
    //   const { isValid, errors } = Validator(obj, validations, messages);
    //   if (!isValid) {
    //     this.setState({
    //       errors
    //     });
    //     return;
    //   }
    try {
      const { category } = this.state;

      const data = { category };
      const response = await axios.post(
        "http:///192.168.2.118:8080/category",
        data
      );
      if (response) {
        this.setState(
          {
            category: ""
          },
          this.getData
        );
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.success("Category added !");
        }
      }
    } catch (error) {
      // this.props.history.goBack("/category-list");
      console.log(error.response);
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

  getData = async () => {
    try {
      const { name, order, status } = this.state;
      const { currentPage, pageLimit } = this.state;
      const skip = (currentPage - 1) * pageLimit;
      const limit = pageLimit;
      const data = { name, order, status, skip, limit };
      var response;
      const res = await axios.post("http://192.168.2.118:8080/showCat1", data);
      var count = res.data.result1;
      if (count % pageLimit != 0) {
        const a = count % pageLimit;
        const b = pageLimit - a;
        count = count + b;
      }
      console.log("res");
      console.log(res);
      if (res.data.success == false) {
        this.setState({
          cat: ""
        });
      }
      this.setState({ totalPageRec: count });
      if (res) {
        response = await axios.post(
          "http://192.168.2.118:8080/getCatByNamee",
          data
        );
      }
      const result = response.data.result1;
      this.setState({ cat: result, skip });
      if (!result) {
        console.log("error");
      }
    } catch (error) {
      toast.error(
        `${(error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Unknown error"}`
      );
    }
  };
  onDelete = async productId => {
    try {
      const response = await axios.delete(
        "http://192.168.2.118:8080/deleteCategory/" + productId
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
    if (totalPages > 1) {
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
    }

    const paginationBasic = (
      <div>
        <Pagination size="sm">{items}</Pagination>
      </div>
    );

    return paginationBasic;
  };

  onPageChange = async pageNumber => {
    this.setState({ currentPage: pageNumber }, this.getData);
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
  handleClose = e => {
    this.setState({ show: false, category: "" });
  };

  handleShow = e => {
    this.setState({ show: true });
  };
  handleOpen = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  onCall = async () => {
    this.setState({ name: "", status: "", sort: "", order: "" }, this.getData);
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

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="bg55">
                <FormGroup inline>
                  <Form inline onSubmit={this.onSubmit}>
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Search by name"
                      value={this.state.name}
                      onChange={this.onInputChange}
                      className="mr-sm-2"
                    />
                    &nbsp;
                    <FormControl
                      as="select"
                      name="order"
                      value={order}
                      onChange={this.onInputChange}
                      className="mr-sm-2"
                    >
                      <option value="">---Sort by name---</option>
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
                      <option value="">---Status---</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </FormControl>
                    &nbsp;
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">Click here to search</Tooltip>
                      }
                    >
                      <Button
                        variant="outline-light"
                        type="submit"
                        className="filter background-btn"
                        // style={{ width: "100px", padding: "5px" }}
                      >
                        <i class="fas fa-search" />
                      </Button>
                    </OverlayTrigger>
                    &nbsp;&nbsp;
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          Click here to refresh
                        </Tooltip>
                      }
                    >
                      <Link to onClick={this.onCall}>
                        <Button
                          variant="outline-light"
                          className="background-btn"
                          className="mr-sm-2 filter"
                        >
                          <i class="fas fa-sync-alt" variant="primary" />
                        </Button>
                      </Link>
                    </OverlayTrigger>
                    <Form>
                      <FormControl
                        type="text"
                        placeholder="Category Name"
                        name="category"
                        value={this.state.category}
                        onChange={this.onInputChange}
                        className="mr-sm-2 filter1"
                      />

                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">
                            Click here to add category
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="outline-light"
                          onClick={this.onSubmit1}
                          className="mr-sm-2 filter1"
                        >
                          <i class="fas fa-plus top" />
                        </Button>
                      </OverlayTrigger>
                      <br />
                      {/* {categoryError ? (
                        <p className="text-danger">{categoryError}</p>
                      ) : null} */}
                    </Form>
                  </Form>
                  <Form inline />
                </FormGroup>
              </CardHeader>
              {/* <CardBody> */}
              <Table responsive hover bordered>
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Name</th>

                    <th scope="col">Total Product</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Status</th>
                    <th scope="col" colSpan="2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cat && cat.length ? (
                    cat.map((cat, index) => (
                      <UserRow
                        obj={cat}
                        key={cat._id}
                        cat={cat}
                        index={index}
                        skip={this.state.skip}
                        onDelete={this.onDelete}
                      />
                    ))
                  ) : (
                    <tr align="center">
                      <th colSpan="11">No record found</th>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* </CardBody> */}
              <CardHeader>
                <div>{this.getPaginator()}</div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(CategoryList);
