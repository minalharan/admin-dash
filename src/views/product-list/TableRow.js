import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Badge } from "reactstrap";
import { MDBBtn } from "mdbreact";
import Update from "./update.js";
import Swal from "sweetalert2";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

const BASE_URL = "http://192.168.2.118:8080/";
class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: "",
      isOpen: false
    };
  }
  getBadge = status => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  componentDidMount = async () => {
    try {
      const response = await axios.post(
        "http://192.168.2.118:8080/getItem/" + this.props.obj._id
      );
      const result1 = response.data.result;

      this.setState({
        value: result1
      });
    } catch (error) {
      toast.error(`${error.message || "Unknown error"}`);
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.delete(
        "http://192.168.2.118:8080/deleteItem/" + this.props.obj._id
      );
      toast("product Deleted");
      const result = await axios.post("http://192.168.2.118:8080/getProduct");
    } catch (error) {
      console.log(error);
    }
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
    const { value } = this.state;
    return (
      <tr>
        <td>{this.props.index + this.props.skip + 1}</td>
        <td>
          <img
            src={BASE_URL + this.props.obj.thumbnail}
            width="100px"
            height="100px"
            alt={"logo"}
            onClick={this.handleOpen}
          />
          {this.state.isOpen && (
            <dialog
              className="dialog animate"
              style={{ position: "absolute" }}
              open
              onClick={this.handleOpen}
            >
              <img
                className="image1"
                src={BASE_URL + this.props.obj.thumbnail}
                onClick={this.handleOpen}
                alt="no image"
              />
            </dialog>
          )}
        </td>
        <td className="c">{this.props.obj.name}</td>

        <td width="110px">
          ${this.props.obj.price ? this.props.obj.price.toFixed(2) : 0.0}
        </td>
        <td text-align="center" width="110px">
          {this.props.obj.quantity}
        </td>
        {/* <td>{this.props.obj.category}</td> */}
        <td>{this.props.obj.createTime}</td>
        <td>{this.props.obj.updateTime}</td>
        <td width="110px">
          {" "}
          <Badge
            style={{ fontSize: "90%" }}
            color={this.getBadge(this.props.obj.status)}
          >
            {this.props.obj.status}
          </Badge>
        </td>

        <td width="130px">
          <Link to={"/gtitem/" + this.props.obj._id}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}
            >
              <Button variant="outline-info">
                <i class="fas fa-pencil-alt top" />
              </Button>
            </OverlayTrigger>
          </Link>{" "}
          &nbsp;
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
                  text: "You won't be able to revert this!",
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
              // onClick={e =>
              //   window.confirm("Are you sure you want to delete this item?") &&
              //   this.onSubmit(e)
              // }
            >
              <i class="fas fa-trash top" />
            </Button>
          </OverlayTrigger>
          &nbsp; &nbsp;
        </td>
      </tr>
    );
  }
}
export default TableRow;
