import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "actions";
import Register from "Register/Register";
import Login from "Login/Login";
import Navbar from "Navbar/Navbar";
import Dashboard from "Dashboard/Dashboard";
import "App/App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <Navbar auth={this.props.auth} />
        <Switch>
          <Route path='/user/dashboard' exact>
            <Dashboard />
          </Route>
          <Route path='/user/register' exact>
            <Register />
          </Route>
          <Route path='/user/login' exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(App);
