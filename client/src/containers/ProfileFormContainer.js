import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUser } from 'actions/userActions';
import ProfileForm from 'components/ui/ProfileForm';

const ProfileFormContainer = ({ user, handleModalClick, handleMenuClick }) => {
  const [username, setUsername] = useState(user.username);
  const dispatch = useDispatch();

  const handleChange = (evt) => setUsername(evt.target.value);

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
      handleChange={handleChange}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default ProfileFormContainer;
