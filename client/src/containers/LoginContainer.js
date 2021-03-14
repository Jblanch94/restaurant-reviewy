import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../actions/authActions';
import Login from '../components/pages/Login';
import useInput from '../hooks/useInput';

const LoginContainer = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, onHandleUsername] = useInput('');
  const [password, onHandlePassword] = useInput('');

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loginUser({ username, password }, history));
  };

  return (
    <Login
      auth={auth}
      onFormSubmit={onFormSubmit}
      username={username}
      password={password}
      onHandleUsername={onHandleUsername}
      onHandlePassword={onHandlePassword}
    />
  );
};

export default LoginContainer;
