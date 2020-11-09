import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const DashboardContainer = lazy(() => import('containers/DashboardContainer'));
const Register = lazy(() => import('Register/Register'));
const LoginContainer = lazy(() => import('containers/LoginContainer'));
const AdminRestaurantFormContainer = lazy(() =>
  import('containers/AdminRestaurantFormContainer')
);
const NavbarContainer = lazy(() => import('containers/NavbarContainer'));
const Restaurant = lazy(() => import('Restaurant/Restaurant'));
const ReviewForm = lazy(() => import('ReviewForm/ReviewForm'));

const Routes = ({ user, auth }) => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <NavbarContainer user={user} auth={auth} />
        <Switch>
          <Route path="/" exact component={DashboardContainer} />

          <Route path="/user/register" exact>
            <Register />
          </Route>
          <Route path="/user/login" exact>
            <LoginContainer />
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
      </Suspense>
    </Router>
  );
};

export default Routes;
