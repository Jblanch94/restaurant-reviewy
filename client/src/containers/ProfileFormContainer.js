import React from 'react';
import ProfileForm from '../components/ui/ProfileForm';
import useInput from '../hooks/useInput';
import useActions from '../hooks/useActions';

const ProfileFormContainer = ({ user, handleModalClick, handleMenuClick }) => {
  const [username, onHandleUsername] = useInput(user.user.username);
  const { userActions } = useActions();

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    userActions.updateUser({ username });
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
