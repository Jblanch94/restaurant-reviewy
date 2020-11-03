import React, { Component } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUser } from 'actions';
import Register from 'Register/Register';
import Login from 'Login/Login';
import Navbar from 'Navbar/Navbar';
import UserDashboard from 'Dashboard/UserDashboard';
import AdminDashboard from 'Dashboard/AdminDashboard';
import Restaurant from 'Restaurant/Restaurant';
import ReviewForm from 'ReviewForm/ReviewForm';
import AdminRestaurantForm from 'AdminRestaurantForm/AdminRestaurantForm';
import 'App/App.css';

class App extends Component {
  componentDidMount() {
    if (this.props.auth.token) {
      this.props.fetchUser();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (_.isEmpty(this.props.user) && this.props.auth.isAuthenticated) ||
      (_.isEqual(prevProps.user, this.props.user) &&
        this.props.auth.isAuthenticated)
    ) {
      this.props.fetchUser();
    }
  }

  render() {
    console.log(this.props);
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route
            path="/user/dashboard"
            exact
            render={(routeProps) =>
              !this.props.user.isadmin ? (
                <UserDashboard {...routeProps} />
              ) : (
                <Redirect to="/admin/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            render={(routeProps) =>
              this.props.user.isadmin && this.props.auth.isAuthenticated ? (
                <AdminDashboard {...routeProps} />
              ) : (
                <Redirect to="/user/dashboard" />
              )
            }
          />

          <Route path="/user/register" exact>
            <Register />
          </Route>
          <Route path="/user/login" exact>
            <Login />
          </Route>
          <Route
            path="/user/dashboard/restaurant/:id"
            render={(routeProps) => <Restaurant {...routeProps} />}
          />
          <Route path="/user/review" exact>
            <ReviewForm />
          </Route>
          <Route
            exact
            path="/admin/restaurant-form"
            render={() =>
              this.props.user.isadmin ? (
                <AdminRestaurantForm />
              ) : (
                <Redirect to="/user/dashboard" />
              )
            }
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
