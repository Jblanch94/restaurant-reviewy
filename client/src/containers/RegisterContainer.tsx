import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import { registerUser } from '../actions/authActions';
import Register from '../components/pages/Register';

type errors = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};

const RegisterContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onHandleChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    fn: (e: any) => void
  ) => fn(evt.target.value);

  //validate form fields
  const formValidation = () => {
    let errors: errors = {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
    };
    //check that first name and last name is not empty
    if (first_name.length === 0) {
      errors.first_name = 'Must provide a first name!';
    } else if (last_name.length === 0) {
      errors.last_name = 'Must provide a last name!';
    }

    //check that username has at least 8 characters
    if (username.length < 8) {
      errors.username = 'Username must contain at least 8 characters!';
    }

    //check if it is a valid password
    if (password.length < 8) {
      errors.password = 'Password must contain at least 8 characters!';
    }
    return errors;
  };

  const onFormSubmit = (evt: React.FormEvent) => {
    //prevent refresh of page
    evt.preventDefault();

    //check for errors
    const formErrors = formValidation();
    setErrors(formErrors);

    //if there are no errors then make api request and clear fields
    if (_.keys(formErrors).length === 0) {
      dispatch(
        registerUser(
          {
            first_name,
            last_name,
            username,
            password,
          },
          history
        )
      );
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Register
      onHandleChange={onHandleChange}
      onFormSubmit={onFormSubmit}
      functions={{
        setFirstName,
        setLastName,
        setUsername,
        setErrors,
        setPassword,
      }}
      values={{ first_name, last_name, username, password, errors }}
    />
  );
};

export default RegisterContainer;
