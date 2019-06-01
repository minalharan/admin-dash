import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {
  Image,
  Button,
  FormControl,
  FormGroup,
  Form,
  Pagination,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
const BASE_URL = "http://192.168.2.118:8080/";

class UserRow extends Component {
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

  render() {
    return (
      <>
        {/* key={user._id.toString()} */}
        <tr>
          <th scope="row">{this.props.index + this.props.skip + 1}</th>
          <th>
            <Image
              src={BASE_URL + this.props.user.file}
              width="80px"
              height="80px"
            />
          </th>
          <td className="c">{this.props.user.name}</td>
          <td max-width="40px">{this.props.user.email}</td>
          <td max-width="90px">{this.props.user.mobile_no}</td>
          <td max-width="90px">{this.props.user.gender}</td>
          <td width="40px">{this.props.user.lastLogin}</td>
          <td max-width="40px">{this.props.user.createTime}</td>
          <td max-width="40px">{this.props.user.updateTime}</td>
          <td max-width="110px">
            <Link to={"/users/" + this.props.user._id}>
              <Badge
                style={{ fontSize: "90%" }}
                color={this.getBadge(this.props.user.status)}
              >
                {this.props.user.status}
              </Badge>
            </Link>
          </td>
          <td width="110px" colSpan="2">
            <Link to={"/users/" + this.props.user._id}>
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
                <i class="fas fa-trash-alt" />
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      </>
    );
  }
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      name: "",
      order: "",
      status: "",
      currentPage: 1,
      totalPageRec: 0,
      pageLimit: 6,
      skip: 0,
      gender: ""
    };
  }
  componentDidMount = async () => {
    this.getData();
  };
  onSubmit = async e => {
    e.preventDefault();
    this.getData();
    return;
  };

  getData = async () => {
    const { name, order, status, gender } = this.state;
    const { currentPage, pageLimit } = this.state;
    const skip = (currentPage - 1) * pageLimit;
    const limit = pageLimit;
    const obj = { skip, limit };
    const data = { name, order, status, skip, limit, gender };
    var response;
    const res = await axios.post("http://192.168.2.118:8080/showUser1", data);
    var count = res.data.result;
    if (count % pageLimit != 0) {
      const a = count % pageLimit;
      const b = pageLimit - a;
      count = count + b;
    }
    if (res.data.sucess == false) {
      this.setState({
        user: ""
      });
    }
    this.setState({ totalPageRec: count });

    response = await axios.post(
      "http://192.168.2.118:8080/getUserByName",
      data
    );
    if (!response) {
      this.setState({ name: "", order: "", status: "", gender: "" });
    }
    var result = response.data.result1;
    this.setState({ user: result, skip });
    if (!result) {
      console.log("error");
    }
  };
  onCall = async () => {
    this.setState(
      { name: "", status: "", order: "", gender: "" },
      this.getData
    );
  };
  onDelete = async productId => {
    try {
      const response = await axios.delete(
        "http://192.168.2.118:8080/deleteUser/" + productId
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
    console.log("Page number :-", pageNumber);
    this.setState({ currentPage: pageNumber }, this.getData);
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { user, name, order, currentPage, skip, status, gender } = this.state;
    console.log("userssss ", user);

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
                      value={name}
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
                      className="mr-sm-2"
                    >
                      <option value="">---Status---</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </FormControl>
                    &nbsp;
                    <FormControl
                      as="select"
                      name="gender"
                      value={gender}
                      onChange={this.onInputChange}
                      className="mr-sm-2"
                    >
                      <option value="">---Gender---</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
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
                        >
                          <i class="fas fa-sync-alt" variant="primary" />
                        </Button>
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          Click here to add new user
                        </Tooltip>
                      }
                    >
                      <Link to={"/add-user"}>
                        <Button
                          className="header"
                          className="mr-sm-2 filter"
                          variant="outline-light"
                        >
                          <i class="fa fa-plus top" aria-hidden="true" />
                        </Button>
                      </Link>
                    </OverlayTrigger>
                  </Form>
                </FormGroup>
              </CardHeader>
              {/* <CardBody> */}
              <Table responsive hover bordered>
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Last Login </th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Status</th>
                    <th scope="col" colSpan="2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user && user.length ? (
                    user.map((user, index) => (
                      <UserRow
                        obj={user}
                        key={user._id}
                        user={user}
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

export default Users;
