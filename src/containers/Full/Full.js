import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { ToastContainer } from "react-toastify";

import jwt from 'jsonwebtoken';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import setSocket from "../../index";
//User
import UserList from '../../views/Users/list';
import UserView from '../../views/Users/view';


// const PrivateRoute = ({ component: Component,  }) => (
//   <Route render={props => (
//     localStorage.getItem('accessToken')
//       ? <Component {...props} />
//       : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//   )} />
// )

class Full extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (localStorage.getItem('accessToken') === undefined || localStorage.getItem('accessToken') === null) {
   


      this.props.history.push('/login');
      return;
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <ToastContainer />
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard} />



                <Route path="/user" exact={true} name="UserList" component={UserList} />
                <Route path="/user/:id" name="UserView" component={UserView} />

                <Redirect from="/" to="/dashboard" />

              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
