import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    }
  }
  componentDidMount = async () => {
    const { user } = this.state;
    const res = await axios.get("http://192.168.2.107:8080/getuser/" + this.props.match.params.id)//console.log(res.data.result);
    console.log("result  :-", this.props.match.params.id);
    const result = res.data.result1[0];
    this.setState({ user: result });
    console.log("users :-", result)
    if (!result) {
      console.log("error");
    }
  }

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
  onChangefile = e => {
    console.log(e.target.files[0]);
    console.log("e.target.files[0]");
    this.setState({
      file: e.target.files[0] ? e.target.files[0] : null,
      imageUpdated: true
    });
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

    const { user } = this.state;

    return (

      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
                <Link onClick={this.isEnable} align="right">
                  <i class="fas fa-user-edit top" style={{paddingLeft:150}}/>
                  Edit
</Link>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <th scope="row"><input type="text" name="name" value={this.state.user.name} readOnly /></th>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <th scope="row"><input type="text" name="email" value={this.state.user.email} readOnly /></th>
                    </tr>
                    <tr>
                      <th scope="row">Mobile</th>
                      <th scope="row"><input type="text" name="mobile" value={this.state.user.mobile_no} readOnly /></th>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <th scope="row"><input type="text" name="gender" value={this.state.user.gender} readOnly /></th>
                    </tr>
                    <tr>
                      <th scope="row">Status</th>
                      <th scope="row"><input type="text" name="status" value={this.state.user.status} readOnly /></th>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
