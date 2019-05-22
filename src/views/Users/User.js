import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";
//import usersData from './UsersData'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user:""
    }
    }
    componentDidMount = async () => {  
      const{user}=this.state;
      const res = await axios.get("http://192.168.2.112:8080/getuser/"+this.props.match.params.id)//console.log(res.data.result);
      console.log("result  :-",this.props.match.params.id);
      const result = res.data.result1[0];
      this.setState({ user: result});
      console.log("users :-",result)
      if (!result) {
      console.log("error");
      }
      }

  render() {

const {user} = this.state;

    //const user1 = usersData.find( user => user.id.toString() === this.props.match.params.id)
console.log("users  ",user);
   //const userDetails = user1 ? Object.entries(user1) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
    
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {/* {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                      {user && user.length ? user.map((user, index) =>{
                        user={user} })
                      : null} */}
                      <tr>
                      <th scope="row">Name</th>
                      <th scope="row">{this.state.user.name}</th>
                      </tr>
                      <tr>
                      <th scope="row">Email</th>
                      <th scope="row">{this.state.user.email}</th>
                      </tr>
                      <tr>
                      <th scope="row">Mobile</th>
                      <th scope="row">{this.state.user.mobile_no}</th>
                      </tr>
                      <tr>
                      <th scope="row">Gender</th>
                      <th scope="row">{this.state.user.gender}</th>
                      </tr>
                      <tr>
                      <th scope="row">Status</th>
                      <th scope="row">{this.state.user.status}</th>
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
