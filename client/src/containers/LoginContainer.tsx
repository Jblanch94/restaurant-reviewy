import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '../actions/authActions';
import { RootState } from '../reducers';
import Login from '../components/pages/Login';

const LoginContainer: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onHandleChange = (
    evt: any,
    fn: (e: React.FormEvent<HTMLInputElement>) => void
  ) => fn(evt.target.value);

  const onFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(loginUser({ username, password }, history));
  };

  return (
    <Login
      auth={auth}
      onHandleChange={onHandleChange}
      onFormSubmit={onFormSubmit}
      username={username}
      password={password}
      functions={{ setUsername, setPassword }}
    />
  );
};

export default LoginContainer;
