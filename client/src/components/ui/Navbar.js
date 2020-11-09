import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantMenuSharpIcon from '@material-ui/icons/RestaurantMenuSharp';
import { AppBar, Toolbar } from '@material-ui/core';

import AvatarMenu from 'components/ui/AvatarMenu';
import LinkText from 'components/ui/LinkText';
import useStyles from 'assets/styles/Navbar';

const Navbar = ({ user, auth, logout, dispatch }) => {
  const classes = useStyles();

  function renderWriteReview() {
    if (!user.isadmin) {
      return (
        <div className={classes.writeReview}>
          <LinkText
            path="/user/review"
            component="h3"
            text="Write Review"
            classes={{ link: classes.link, text: classes.home }}
          />
        </div>
      );
    } else return null;
  }

  function renderSignIn() {
    return (
      <LinkText
        path="/user/login"
        component="h3"
        text="Sign In"
        classes={{ link: classes.signIn }}
      />
    );
  }

  function renderLoggedInUser() {
    const token = sessionStorage.getItem('token');
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.iconLink}>
            <RestaurantMenuSharpIcon fontSize="large" />
          </Link>
          <div className={classes.home}>
            <LinkText
              path="/"
              component="h3"
              text="Home"
              classes={{ link: classes.link, text: classes.home }}
            />
          </div>
          {renderWriteReview()}
          {!token ? (
            renderSignIn()
          ) : (
            <AvatarMenu user={user} logout={logout} dispatch={dispatch} />
          )}
        </Toolbar>
      </AppBar>
    );
  }
  return <>{renderLoggedInUser()}</>;
};

export default Navbar;
