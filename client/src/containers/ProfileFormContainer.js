import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUser } from '../actions/userActions';
import ProfileForm from '../components/ui/ProfileForm';
import useInput from '../hooks/useInput';

const ProfileFormContainer = ({ user, handleModalClick, handleMenuClick }) => {
  const [username, onHandleUsername] = useInput(user.user.username);
  const dispatch = useDispatch();

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(updateUser({ username }));
    handleModalClick();
    handleMenuClick();
  };

  return (
    <ProfileForm
      user={user}
      username={username}
      handleModalClick={handleModalClick}
      onHandleUsername={onHandleUsername}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default ProfileFormContainer;
