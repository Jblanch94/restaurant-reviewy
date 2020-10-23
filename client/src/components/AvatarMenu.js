import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

class AvatarMenu extends Component {
  state = { open: false, anchorEl: null };

  handleClick = (evt) => {
    const anchorEl = evt.currentTarget;
    this.setState((prevState) => ({
      ...prevState,
      open: !prevState.open,
      anchorEl,
    }));
  };

  render() {
    return (
      <>
        <Avatar id='avatar' onClick={this.handleClick}></Avatar>
        <Menu
          id='avatar-menu'
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClick}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign Out</MenuItem>
        </Menu>
      </>
    );
  }
}

export default AvatarMenu;
