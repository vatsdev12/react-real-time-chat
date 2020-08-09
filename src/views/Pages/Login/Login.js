import React, { Component } from 'react';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { _callApi } from '../../../services/baseService';
import { LagendryToastr } from '../../Notifications/LagendryToastr';
import { ToastContainer } from 'react-toastify';
import jwt from "jsonwebtoken";
import { Loader } from "../loader"
import setSocket from "../../../index"
import { Link } from 'react-router-dom'
class Login extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);

    this.state = {
      email: '',
      password: '',
      loader: false
    };
  }

  handleChange(e) {

    this.setState({
      [e.target.name]: e.target.value
    })
  }



  componentDidMount() {
    if (localStorage.getItem('accessToken') != undefined) {
      this.setState({ auth: jwt.decode(localStorage.getItem('accessToken')) }, function () {

        this.props.history.push('/dashboard');
        return;

      })
    }
  }

  login(e) {
    if (this.state.email === '' || this.state.password === '') {
      LagendryToastr.error('All fields Required');
    } else {
      var data = {
        'email': this.state.email,
        'password': this.state.password,
      }
      this.setState({ loader: true })
      var headerdata = { 'platform': '3' };
      _callApi(data, 'user/login', headerdata)
        .then((response) => {
          this.setState({ loader: false })

          //console.log('response',response)
          if (response.data.statusCode === 1) {
            // if success
            this.setState({ loader: false })
            // setting login session
            localStorage.setItem('user_info', JSON.stringify(response.data.responseData.user._id));
            localStorage.setItem('accessToken', response.data.responseData.accessToken);
            setSocket.emit('join', { userId: response.data.responseData.user._id })
            let self = this, notify = 'Successfully Logged In'

            self.props.history.push('/dashboard');
          } else {
            LagendryToastr.error('Invalid Credentials');
          }
        });
    }
  }

  render() {
    console.log("sssssss", this.state.loader);

    return (

      <div className="app flex-row align-items-center">
        {
          this.state.loader ? <Loader /> : null
        }
      

        <Container>
          <ToastContainer />
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup className="mb-4">
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-user"></i>
                        </span>
                      </div>

                      <Input type="text" placeholder="Username"
                        name='email'
                        value={this.state.email}
                        onChange={e => this.handleChange(e)} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock"></i>
                        </span>
                      </div>
                      <Input type="password" placeholder="Password"
                        name='password'
                        value={this.state.password}
                        onChange={e => this.handleChange(e)} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={(e) => this.login(e)}>Login</Button>
                        {/* <Link to="/register">
                          <Button color="primary" className="px-4">Register</Button>

                        </Link> */}
                      </Col>
                      {/*<Col xs="6" className="text-right">*/}
                      {/*<Button color="link" className="px-0">Forgot password?</Button>*/}
                      {/*</Col>*/}
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
