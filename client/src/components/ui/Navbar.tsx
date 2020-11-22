import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantMenuSharpIcon from '@material-ui/icons/RestaurantMenuSharp';
import { AppBar, Toolbar } from '@material-ui/core';

import AvatarMenu from './AvatarMenu';
import LinkText from './LinkText';
import useStyles from '../../assets/styles/Navbar';

type NavbarProps = {
  user: {
    isadmin: boolean;
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    review_count: number;
  };
  auth: {};
  logout: () => void;
  dispatch: () => void;
  classes: {
    link?: string;
    text?: string;
  };
};

const Navbar: React.FC<NavbarProps> = ({ user, auth, logout, dispatch }) => {
  const classes = useStyles();

  function renderWriteReview(): React.ReactNode {
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

  function renderSignIn(): React.ReactNode {
    return (
      <LinkText
        path="/user/login"
        component="h3"
        text="Sign In"
        classes={{ link: classes.signIn }}
      />
    );
  }

  function renderLoggedInUser(): React.ReactNode {
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
            <AvatarMenu
              user={user}
              logout={logout}
              dispatch={dispatch}
              auth={auth}
            />
          )}
        </Toolbar>
      </AppBar>
    );
  }
  return <>{renderLoggedInUser()}</>;
};

export default Navbar;
