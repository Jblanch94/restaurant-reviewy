import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login';
import Root from '../../../test-utils/Root';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

afterEach(cleanup);

test('Login Component renders without error', () => {
  const props = { auth: { error: '' } };
  const { getByTestId } = render(
    <Root>
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>
    </Root>
  );

  // assert that the Login Component is not null
  expect(getByTestId('Login-Component')).not.toBeNull();
});

describe('Tests for onChange events on both TextField components', () => {
  test('Fires on change event accordingly for username Text Field', () => {
    const props = {
      auth: { error: '' },
      onHandleUsername: jest.fn(),
      onHandlePassword: jest.fn(),
    };
    const { getByRole } = render(
      <Root>
        <MemoryRouter>
          <Login {...props} />
        </MemoryRouter>
      </Root>
    );

    // Get the username field and mock a change event
    const usernameField = getByRole('textbox', { name: 'Username' });
    fireEvent.change(usernameField, { target: { value: 'jblanchard' } });
    expect(props.onHandleUsername).toHaveBeenCalledTimes(1);
    expect(usernameField.value).toBe('jblanchard');
  });

  test('Password field fires onChange handler accordingly', () => {
    const props = { auth: { error: '' }, onHandlePassword: jest.fn() };
    const { getByLabelText } = render(
      <Root>
        <MemoryRouter>
          <Login {...props} />
        </MemoryRouter>
      </Root>
    );

    const passwordField = getByLabelText(/Password/i);
    fireEvent.change(passwordField, {
      target: { value: 'supersecretpassword' },
    });
    expect(props.onHandlePassword).toHaveBeenCalledTimes(1);
    expect(passwordField.value).toBe('supersecretpassword');
  });
});

test('Click on the Sign up Link brings user to the Register page', () => {
  const props = { auth: { error: '' } };
  const history = createMemoryHistory();
  const { getByRole } = render(
    <Root>
      <Router history={history}>
        <Login {...props} />
      </Router>
    </Root>
  );

  const signupLink = getByRole('link', { name: 'Sign Up' });
  fireEvent.click(signupLink);
  expect(history.location.pathname).toBe('/user/register');
});

test('Submit Form brings user to the Dashboard', () => {
  const props = { auth: { error: '' } };
  const history = createMemoryHistory();
  const { getByRole } = render(
    <Root>
      <Router history={history}>
        <Login {...props} />
      </Router>
    </Root>
  );

  const submitButton = getByRole('button', { name: 'Login' });
  fireEvent.submit(submitButton);
  expect(history.location.pathname).toEqual('/');
});

//TODO: LAST THING TO TEST IS VALIDATION TO MAKE SURE ERROR TEXT APPEARS
