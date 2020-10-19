import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Register from "Register/Register";
import Login from "Login/Login";

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route path='/user/register' exact>
          <Register />
        </Route>
        <Route path='/user/login' exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
