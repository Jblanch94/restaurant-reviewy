import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import DashboardContainer from 'containers/DashboardContainer';
import Register from 'Register/Register';
import Login from 'Login/Login';
import AdminRestaurantFormContainer from 'containers/AdminRestaurantFormContainer';
import Navbar from 'components/ui/Navbar';
import Restaurant from 'Restaurant/Restaurant';
import ReviewForm from 'ReviewForm/ReviewForm';

const Routes = ({ user, auth }) => {
  return (
    <Router>
      <Navbar user={user} auth={auth} />
      <Switch>
        <Route path="/" exact component={DashboardContainer} />

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
              <AdminRestaurantFormContainer />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default Routes;
