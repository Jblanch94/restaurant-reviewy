import React from 'react';
import Navbar from '../components/ui/Navbar';

const NavbarContainer = ({ user, auth }) => {
  return <Navbar user={user} auth={auth} />;
};

export default NavbarContainer;
