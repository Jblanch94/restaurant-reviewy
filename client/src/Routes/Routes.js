import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const DashboardContainer = lazy(() => import('containers/DashboardContainer'));
const RegisterContainer = lazy(() => import('containers/RegisterContainer'));
const LoginContainer = lazy(() => import('containers/LoginContainer'));
const AdminRestaurantFormContainer = lazy(() =>
  import('containers/AdminRestaurantFormContainer')
);
const NavbarContainer = lazy(() => import('containers/NavbarContainer'));
const RestaurantContainer = lazy(() =>
  import('containers/RestaurantContainer')
);
const ReviewFormContainer = lazy(() =>
  import('containers/ReviewFormContainer')
);

const Routes = ({ user, auth }) => {
  return (
    <Router>
      <Suspense fallback={'loading...'}>
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
      </Suspense>
    </Router>
  );
};

export default Routes;
