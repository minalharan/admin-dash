import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  FormGroup,
  FormControl,
  Form,
  Pagination
} from "react-bootstrap";
import { toast } from "react-toastify";
import TableRow from "./TableRow.js";
import { Link } from "react-router-dom";

import { Card, CardHeader, Col, Row, Table } from "reactstrap";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      name: "",
      price: "",
      thumbnail: "",
      otherImg: "",
      name: "",
      sort: "",
      categoryValue: [],
      option: "",
      category: "",
      currentPage: 1,
      totalPageRec: 0,
      pageLimit: 5,
      skip: 0,
      quantity: "",
      status: ""
    };
  }

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
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
    this.getData();
  };
  getData = async () => {
    try {
      const { currentPage, pageLimit } = this.state;
      const { name, sort, category, status } = this.state;
      const skip = (currentPage - 1) * pageLimit;
      const limit = pageLimit;
      const obj = { skip, limit };
      const data = { name, sort, category, status, skip, limit };
      var res;
      const response = await axios.post(
        "http://192.168.2.118:8080/showproduct1",
        data
      );
      var count = response.data.result;
      if (count % pageLimit != 0) {
        const a = count % pageLimit;
        const b = pageLimit - a;
        count = count + b;
      }
      this.setState({ totalPageRec: count });
      if (response) {
        res = await axios.post(
          "http://192.168.2.118:8080/searchProductByPrice",
          data
        );
      }

      const result = res.data.result;
      this.setState({ product: result, skip });
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

  // onSubmit = async e => {
  //   e.preventDefault();
  //   this.setState({ product: "" });
  //   const { name, sort, category, status } = this.state;

  //   const data = { name, sort, category, status };

  //   const response = await axios.post(
  //     "http://192.168.2.118:8080/searchProductByPrice",
  //     data
  //   );
  //   if (response) {
  //     this.setState({ name: "", status: "", sort: "", category: "" });
  //     const result = response.data.result;
  //     this.setState({ product: result });
  //   }
  // };

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
    this.setState({ currentPage: pageNumber }, this.getData);
  };

  onDelete = async productId => {
    const result = await axios.delete(
      "http://192.168.2.118:8080/deleteItem/" + productId
    );
    if (result) {
      console.log("product Deleted");
    }
    this.getData();
  };
  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
  onCall = async () => {
    this.setState(
      { name: "", status: "", sort: "", category: "" },
      this.getData
    );
  };

  render() {
    const { product, name, sort, categoryValue, skip } = this.state;
    return (
      <>
        <div className="animated fadeIn">
          <Row>
            <Link to={"/add-product"}>
              <Button className="header">
                {" "}
                <i class="fa fa-plus top" aria-hidden="true" />
                Add Product
              </Button>
            </Link>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <FormGroup inline>
                    <Form inline>
                      <FormControl
                        type="text"
                        name="name"
                        placeholder="search by name"
                        value={name.toLowerCase()}
                        onChange={this.onInputChange}
                        className="mr-sm-2 filter"
                      />
                      &nbsp;&nbsp;
                      <FormControl
                        as="select"
                        name="sort"
                        value={sort}
                        onChange={this.onInputChange}
                        className="mr-sm-2 filter"
                      >
                        <option value="">---Filter---</option>
                        <option value="assending">Price Low to High</option>
                        <option value="desending">Price High to Low</option>
                      </FormControl>
                      <FormControl
                        as="select"
                        name="category"
                        value={this.state.categoryValue._id}
                        onChange={this.onInputChange}
                        className="mr-sm-2 filter"
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
                      <FormControl
                        as="select"
                        name="status"
                        value={this.state.status}
                        onChange={this.onInputChange}
                        className="mr-sm-2 filter"
                      >
                        <option value={null}>Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Banned">Banned</option>
                      </FormControl>
                      <Button
                        variant="outline-primary"
                        className="filter"
                        onClick={this.getData}
                      >
                        <i class="fas fa-search" />
                        Search
                      </Button>
                      &nbsp;&nbsp; &nbsp;&nbsp;
                      <Link to onClick={this.onCall}>
                        <Button variant="outline-primary">
                          <i class="fas fa-sync-alt" variant="primary" />
                        </Button>
                      </Link>
                    </Form>
                  </FormGroup>
                </CardHeader>

                <Table striped hover variant="dark">
                  <thead>
                    <tr>
                      <th text-align="center">S.No.</th>
                      <th text-align="center">Image</th>
                      <th text-align="center">Name</th>
                      <th text-align="center">Price</th>
                      <th text-align="center">Quantity</th>
                      <th text-align="center">Status</th>
                      <th text-align="center">Created At</th>
                      <th text-align="center">Updated At</th>

                      <th colSpan="3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product && product.length
                      ? product.map((product, index) => {
                          return (
                            <TableRow
                              obj={product}
                              key={product._id}
                              index={index}
                              skip={skip}
                              onDelete={this.onDelete}
                            />
                          );
                        })
                      : null}
                  </tbody>
                </Table>
                <CardHeader className="container">
                  {this.getPaginator()}
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default ProductList;
