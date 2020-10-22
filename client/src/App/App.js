import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Register from "Register/Register";
import Login from "Login/Login";
import Navbar from "Navbar/Navbar";
import Dashboard from "Dashboard/Dashboard";
import "App/App.css";

const App = (props) => {
  return (
    <Router>
      <Navbar auth={{ isAuthenticated: false }} />
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
};

export default App;
