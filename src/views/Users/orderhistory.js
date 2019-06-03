import React, { Component, Fragment } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";

import { MDBBtn, MDBIcon } from "mdbreact";
import { toast } from "react-toastify";

import { withRouter } from "react-router-dom";
const BASE_URL = "http://192.168.2.118:8080/";

class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Isopen: false
    };
  }
  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("cliked");
  };

  render() {
    const { product, obj, category, object } = this.props;

    return (
      <tr className="animate">
        <td />
        <td align="center">
          <img
            height="50px"
            width="50px"
            alt="NO Image"
            src={BASE_URL + obj.file}
            onClick={this.handleShowDialog}
          />
        </td>
        <td className="c" align="center">
          {obj.name}
        </td>
        <td className="c" align="center">
          <i class="fas fa-dollar-sign" /> {obj.price}
        </td>
        <td align="center">{obj.quantity}</td>
        <td align="center">
          <i class="fas fa-rupee-sign" /> {obj.amount}
        </td>
        <td align="center">{obj.createTime}</td>
        <td align="center">{obj.trans_id}</td>
      </tr>
    );
  }
}

// export default withRouter(OrderComponent);
class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      Cid: this.props.match.params.id
    };
  }
  componentDidMount = async () => {
    const { order } = this.state;
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    const { Cid } = this.state;
    // this.setState({ Cid:  });
    console.log(this.props.match.params.id);
    const data = { Cid };
    const res = await axios.post(
      "http://192.168.2.118:8080/orderhistory",
      data
    );
    console.log("amit", res);
    // const result = res.data.result1;

    this.setState({ order: res.data.result });
    // console.log("adadaabdvbsudgh" , result);

    if (!order) {
      console.log("error");
    }
  };
  render() {
    const { order, category } = this.state;
    return (
      <>
        <div className="order-history">
          <h2 align="center">Order History</h2>

          <Table striped bordered hover variant="dark" className="css-serial">
            <thead>
              <tr class="table-active" textAlign="center">
                <th align="center">S.No.</th>
                <th align="center">Product Image</th>
                <th align="center">Product</th>
                <th align="center"> Price</th>
                <th align="center">Quantity</th>
                <th align="center">Amount</th>
                <th>Purchase Date</th>
                <th>Transaction Id</th>
                {/* <th>Status</th> */}
                {/* <th colSpan="2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {order && order.length ? (
                order.map(order => {
                  return <OrderComponent obj={order} key={order._id} />;
                })
              ) : (
                <tr align="center">
                  <th colSpan="11">
                    {" "}
                    <i
                      class="fa fa-exclamation-circle top"
                      aria-hidden="true"
                    />
                    No record found
                  </th>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
export default OrderList;
