import React, { Component } from "react";
import { Link } from "react-router-dom";
class Logout extends Component {
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
      console.log("in it");
    }
  };
  render() {
    return (
      <Link to={"/login"} onClick={localStorage.clear()}>
        LOGOUT
      </Link>
    );
  }
}
export default Logout;
