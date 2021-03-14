import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Dialog } from '@material-ui/core';
import ProfileFormContainer from '../../containers/ProfileFormContainer';
import useActions from '../../hooks/useActions';

const AvatarMenu = ({ user, auth, logout, dispatch }) => {
  const { authActions } = useActions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = () => setMenuOpen(!menuOpen);

  const onOpenOrClose = (evt) => {
    setAnchorEl(evt.currentTarget);
    handleMenuClick();
  };

  const handleModalClick = () => setModalOpen(!modalOpen);

  return (
    <div>
      <Avatar id="avatar" onClick={onOpenOrClose} />
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={onOpenOrClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MenuItem onClick={handleModalClick}>Profile</MenuItem>
        <MenuItem onClick={() => authActions.logout()}>Sign Out</MenuItem>
      </Menu>
      <Dialog
        disableBackdropClick
        onClose={handleModalClick}
        open={modalOpen}
        transitionDuration={500}
        maxWidth="sm"
        fullWidth>
        <ProfileFormContainer
          user={user}
          handleModalClick={handleModalClick}
          handleMenuClick={handleMenuClick}
        />
      </Dialog>
    </div>
  );
};

export default AvatarMenu;
