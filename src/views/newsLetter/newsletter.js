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
import axios from "axios";
const BASE_URL = "http://192.168.2.118:8080/";
//import usersData from './UsersData'

class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <>
        {/* key={user._id.toString()} */}
        <tr>
          <th scope="row">{this.props.index + this.props.skip + 1}</th>
          <td>{this.props.news.email}</td>

          <td>{this.props.news.createTime}</td>
          <td>{this.props.news.updateTime}</td>
          <td>
            <Badge
              color={this.getBadge(this.props.news.status)}
              onClick={e =>
                Swal.fire({
                  title: "Are you sure you want to change the status?",

                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes !"
                }).then(result => {
                  if (result.value) {
                    Swal.fire(
                      "Status has been changed successfully !",
                      "Success"
                    ) &&
                      this.props.onChangeCat(
                        this.props.obj._id,
                        this.props.obj.status
                      );
                  }
                })
              }
            >
              {this.props.news.status}
            </Badge>
          </td>
          <td colSpan="2">
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
              <i class="fas fa-trash-alt" />
            </Button>
          </td>
        </tr>
      </>
    );
  }
}

class NewsLetterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      order: "",
      status: "",
      email: "",
      currentPage: 1,
      totalPageRec: 0,
      pageLimit: 5,
      skip: 0
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
  onChangeCat = async (productId, abc) => {
    try {
      const response = await axios.post(
        "http://192.168.2.118:8080/UpdateNewsLetter/" + productId + "/" + abc
      );

      const result1 = response.data.result;
      console.log("response", result1);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  };

  getData = async () => {
    const { email, order, status } = this.state;
    const { currentPage, pageLimit } = this.state;
    const skip = (currentPage - 1) * pageLimit;
    const limit = pageLimit;
    const data = { email, order, status, skip, limit };
    var response;
    const res = await axios.post(
      "http://192.168.2.118:8080/newsletterCount",
      data
    );
    var count = res.data.result1;
    if (count % pageLimit != 0) {
      const a = count % pageLimit;
      const b = pageLimit - a;
      count = count + b;
    }
    this.setState({ totalPageRec: count });
    if (res) {
      response = await axios.post(
        "http://192.168.2.118:8080/getNewsLetter",
        data
      );
    }

    const result1 = response.data.result;
    console.log(result1);

    this.setState({ news: result1, skip });
    if (!result1) {
      console.log("error");
    }
  };

  onDelete = async productId => {
    try {
      const response = await axios.delete(
        "http://192.168.2.118:8080/deleteNewsLetter/" + productId
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

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
  onCall = async () => {
    this.setState({ email: "", status: "", order: "" }, this.getData);
  };

  render() {
    const { news, order, currentPage, skip, status, email } = this.state;
    console.log("userssss  ", news);

    // const userList = usersData.filter((user) => user.id < 10)

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
                      name="email"
                      placeholder="Search by email"
                      value={email}
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
                      <option value="">---Email---</option>
                      <option value="assending">Order By Email A to Z</option>
                      <option value="desending">Order By Email Z to A</option>
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
                  </Form>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive hover bordered>
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Email</th>

                      <th scope="col">Create Time</th>
                      <th scope="col">Update Time</th>
                      <th scope="col">Status</th>
                      <th scope="col" colSpan="2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {news && news.length
                      ? news.map((news, index) => (
                          <UserRow
                            obj={news}
                            key={news._id}
                            news={news}
                            index={index}
                            skip={this.state.skip}
                            onDelete={this.onDelete}
                            onChangeCat={this.onChangeCat}
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

export default NewsLetterList;
