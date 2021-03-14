import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Login from '../components/pages/Login';
import useInput from '../hooks/useInput';
import useActions from '../hooks/useActions';

const LoginContainer = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const { authActions } = useActions();
  const [username, onHandleUsername] = useInput('');
  const [password, onHandlePassword] = useInput('');

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    authActions.loginUser({ username, password }, history);
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
