import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import UserDashboard from 'Dashboard/UserDashboard';
import AdminDashboard from 'Dashboard/AdminDashboard';
import Register from 'Register/Register';
import Login from 'Login/Login';
import AdminRestaurantForm from 'AdminRestaurantForm/AdminRestaurantForm';
import Navbar from 'Navbar/Navbar';
import Restaurant from 'Restaurant/Restaurant';
import ReviewForm from 'ReviewForm/ReviewForm';

const Routes = ({ user, auth }) => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          render={(routeProps) =>
            !user.isadmin ? (
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
            user.isadmin ? (
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
            user.isadmin ? (
              <AdminRestaurantForm />
            ) : (
              <Redirect to="/user/dashboard" />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default Routes;
