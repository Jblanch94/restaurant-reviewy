import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Register from '../components/pages/Register';
import useInput from '../hooks/useInput';
import useActions from '../hooks/useActions';

const RegisterContainer = () => {
  const history = useHistory();
  const [first_name, onHandleFirstName] = useInput('');
  const [last_name, onHandleLastName] = useInput('');
  const [username, onHandleUsername] = useInput('');
  const [password, onHandlePassword] = useInput('');
  const [errors, setErrors] = useState({});
  const { authActions } = useActions();

  //validate form fields
  const formValidation = () => {
    let errors = {
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

  const onFormSubmit = (evt) => {
    //prevent refresh of page
    evt.preventDefault();

    //check for errors
    const formErrors = formValidation();
    setErrors(formErrors);

    //if there are no errors then make api request and clear fields
    if (
      formErrors.first_name === '' &&
      formErrors.last_name === '' &&
      formErrors.username === '' &&
      formErrors.password === ''
    ) {
      authActions.registerUser(
        {
          first_name,
          last_name,
          username,
          password,
        },
        history
      );
    }
  };

  return (
    <Register
      onFormSubmit={onFormSubmit}
      functions={{
        onHandleFirstName,
        onHandleLastName,
        onHandleUsername,
        setErrors,
        onHandlePassword,
      }}
      values={{ first_name, last_name, username, password, errors }}
    />
  );
};

export default RegisterContainer;
