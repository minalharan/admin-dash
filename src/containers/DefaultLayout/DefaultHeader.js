import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import axios from "axios";
const BASE_URL = "http://192.168.2.118:8080/";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      Cid: localStorage.getItem("cid")
    };
  }
  componentDidMount = async () => {
    const { file } = this.state;
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   this.props.history.push("/login");
    // }
    try {
      const { Cid } = this.state;
      const obj = { Cid };
      const response = await axios.post(
        "http://192.168.2.118:8080/profile",
        obj
      );

      this.setState({
        file: response.data.result.file
      });
      console.log("file");
      console.log(response.data.result.file);
    } catch (error) {}
  };
  render() {
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ width: 89, height: 25, alt: "Shopping Dashboard" }}
          minimized={{
            width: 30,
            height: 30,
            alt: "Shopping Dashboard"
          }}
        />

        <Nav className="d-md-down-none" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={BASE_URL + this.state.file}
                className="img-avatar"
                width="30"
                alt="admin"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <Link to={"/admin-profile"}>
                <DropdownItem>
                  <i class="fas fa-user" />
                  Profile
                </DropdownItem>
              </Link>
              <Link to={"/check-password"}>
                <DropdownItem>
                  <i className="fa fa-key" />
                  Change Password
                </DropdownItem>
              </Link>
              <Link to={"/logout"}>
                <DropdownItem>
                  <i className="fa fa-lock" /> Logout
                </DropdownItem>
              </Link>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
