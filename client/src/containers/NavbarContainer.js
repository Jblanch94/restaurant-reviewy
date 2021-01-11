import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../actions/authActions';
import Navbar from '../components/ui/Navbar';

const NavbarContainer = ({ user, auth }) => {
  const dispatch = useDispatch();

  return <Navbar dispatch={dispatch} logout={logout} user={user} auth={auth} />;
};

export default NavbarContainer;
