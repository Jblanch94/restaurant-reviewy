import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../actions/authActions';
import { RootState } from '../reducers';
import Navbar from '../components/ui/Navbar';

type NavbarContainerProps = {
  user: RootState;
  auth: RootState;
};

const NavbarContainer: React.FC<NavbarContainerProps> = ({ user, auth }) => {
  const dispatch = useDispatch();

  return <Navbar dispatch={dispatch} logout={logout} user={user} auth={auth} />;
};

export default NavbarContainer;
