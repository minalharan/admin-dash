import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";
//import usersData from './UsersData'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user._id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user._id.toString()}>
      <th scope="row"><Link to={userLink}>{props.index+1}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.email}</td>
      <td>{user.mobile_no}</td>
      <td>{user.gender}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    </tr>
  )
}

class Users extends Component {
  constructor(props) {
  super(props);
  this.state = { user: []
  }
  }
  componentDidMount = async () => {  
    //const{user}=this.state;
    const res = await axios.get("http://192.168.2.112:8080/getuser")//console.log(res.data.result);
    //console.log("result");
    const result = res.data.result1;
    this.setState({ user: result});
   // console.log("users :-",result)
    if (!result) {
    console.log("error");
    }
    }
    
  render() {

    const {user} = this.state;
    console.log("userssss  ",user);

   // const userList = usersData.filter((user) => user.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Gender</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log("uuuuuu  :-",user.length)}
                    {user && user.length ? user.map((user, index) =>
                      <UserRow obj={user} key={user._id} user={user} index={index} />)
                      : null}
                      
                    
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

export default Users;
