import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Dialog } from '@material-ui/core';

import { logout } from 'actions/authActions';
import ProfileForm from 'components/ui/ProfileForm';

class AvatarMenu extends Component {
  state = { menuOpen: false, modalOpen: false, anchorEl: null };

  handleMenuClick = (evt) => {
    const anchorEl = evt.currentTarget;
    this.setState((prevState) => ({
      ...prevState,
      menuOpen: !prevState.menuOpen,
      anchorEl,
    }));
  };

  handleModalClick = () => {
    this.setState((prevState) => ({
      ...prevState,
      modalOpen: !prevState.modalOpen,
    }));
  };

  render() {
    return (
      <div>
        <Avatar id="avatar" onClick={this.handleMenuClick}></Avatar>
        <Menu
          id="avatar-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.menuOpen}
          onClose={this.handleMenuClick}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MenuItem onClick={this.handleModalClick}>Profile</MenuItem>
          <MenuItem onClick={this.props.logout}>Sign Out</MenuItem>
        </Menu>
        <Dialog
          disableBackdropClick
          onClose={this.handleModalClick}
          open={this.state.modalOpen}
          transitionDuration={500}
          maxWidth="sm"
          fullWidth
        >
          <ProfileForm
            user={this.props.user}
            handleModalClick={this.handleModalClick}
          />
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { logout })(AvatarMenu);
