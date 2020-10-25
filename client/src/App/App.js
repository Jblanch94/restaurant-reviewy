import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchUser } from "actions";
import Register from "Register/Register";
import Login from "Login/Login";
import Navbar from "Navbar/Navbar";
import Dashboard from "Dashboard/Dashboard";
import "App/App.css";

//ISSUE DOES NOT UPDATE WHEN IT NEEDS TO AND MAKES 3 REQUESTS TO FETCH USER

class App extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchUser();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      if (
        !this.props.user.user_id ||
        !_.isEqual(this.props.user, prevProps.user)
      ) {
        this.props.fetchUser();
      }
    }
  }

  render() {
    console.log("user", this.props.user);
    return (
      <Router>
        <Navbar auth={this.props.auth} user={this.props.user} />
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
