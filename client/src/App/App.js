import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUser } from '../actions/userActions';
import { isAuthenticated } from '../actions/authActions';
import './App.css';
import Routes from '../Routes/Routes';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(isAuthenticated());
    }

    if (auth.isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, auth.isAuthenticated, auth.token]);

  return <Routes user={user} auth={auth} />;
};

export default App;
