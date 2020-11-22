import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Dialog } from '@material-ui/core';

import ProfileFormContainer from '../../containers/ProfileFormContainer';

type AvatarMenuProps = {
  user: {};
  auth: {};
  logout: () => void;
  dispatch: (args: any) => void;
};

const AvatarMenu: React.FC<AvatarMenuProps> = ({
  user,
  auth,
  logout,
  dispatch,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (): void => setMenuOpen(!menuOpen);

  const onOpenOrClose = (evt: any): void => {
    setAnchorEl(evt.currentTarget);
    handleMenuClick();
  };

  const handleModalClick = (): void => setModalOpen(!modalOpen);

  return (
    <div>
      <Avatar id="avatar" onClick={onOpenOrClose} />
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={onOpenOrClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem onClick={handleModalClick}>Profile</MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>Sign Out</MenuItem>
      </Menu>
      <Dialog
        disableBackdropClick
        onClose={handleModalClick}
        open={modalOpen}
        transitionDuration={500}
        maxWidth="sm"
        fullWidth
      >
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
