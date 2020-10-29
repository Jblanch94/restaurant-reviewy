import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchUser } from "actions";
import Register from "Register/Register";
import Login from "Login/Login";
import Navbar from "Navbar/Navbar";
import Dashboard from "Dashboard/Dashboard";
import Restaurant from "Restaurant/Restaurant";
import "App/App.css";

class App extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.props.fetchUser();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (_.isEmpty(this.props.user) && this.props.auth.isAuthenticated) ||
      (_.isEqual(prevProps.user, this.props.user) && this.props.isAuthenticated)
    ) {
      this.props.fetchUser();
    }
  }

  render() {
    return (
      <Router>
        <Navbar />
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
          <Route
            path='/user/dashboard/restaurant/:id'
            render={(routeProps) => <Restaurant {...routeProps} />}
          />
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
