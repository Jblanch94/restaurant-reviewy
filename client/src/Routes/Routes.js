import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import DashboardContainer from 'containers/DashboardContainer';
import RegisterContainer from 'containers/RegisterContainer';
import LoginContainer from 'containers/LoginContainer';
import AdminRestaurantFormContainer from 'containers/AdminRestaurantFormContainer';
import NavbarContainer from 'containers/NavbarContainer';
import RestaurantContainer from 'containers/RestaurantContainer';
import ReviewFormContainer from 'containers/ReviewFormContainer';

// const DashboardContainer = lazy(() => import('containers/DashboardContainer'));
// const RegisterContainer = lazy(() => import('containers/RegisterContainer'));
// const LoginContainer = lazy(() => import('containers/LoginContainer'));
// const AdminRestaurantFormContainer = lazy(() =>
//   import('containers/AdminRestaurantFormContainer')
// );
// const NavbarContainer = lazy(() => import('containers/NavbarContainer'));
// const RestaurantContainer = lazy(() =>
//   import('containers/RestaurantContainer')
// );
// const ReviewFormContainer = lazy(() =>
//   import('containers/ReviewFormContainer')
// );

const Routes = ({ user, auth }) => {
  return (
    <Router>
      <NavbarContainer user={user} auth={auth} />
      <Switch>
        <Route path="/" exact component={DashboardContainer} />

        <Route path="/user/register" exact>
          <RegisterContainer />
        </Route>
        <Route path="/user/login" exact>
          <LoginContainer />
        </Route>
        <Route
          path="/user/dashboard/restaurant/:id"
          render={(routeProps) => <RestaurantContainer {...routeProps} />}
        />
        <Route path="/user/review" exact>
          <ReviewFormContainer />
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
