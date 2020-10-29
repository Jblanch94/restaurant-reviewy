import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RestaurantMenuSharpIcon from "@material-ui/icons/RestaurantMenuSharp";
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AvatarMenu from "components/AvatarMenu";
import LinkText from "components/LinkText";

const useStyles = makeStyles((theme) => ({
  iconLink: {
    marginRight: theme.spacing(2),
    color: "#fff",
  },
  home: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    marginRight: theme.spacing(2),
    color: "#fff",
  },
  writeReview: {
    marginRight: theme.spacing(2),
  },
  profile: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
  signIn: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: "#fff",
  },
}));

//TODO: NEED TO IMPLEMENT LOGIC FOR WRITE REVIEW, AUTH AND PROFILE

const Navbar = ({ auth, user }) => {
  const classes = useStyles();

  function renderSignIn() {
    return (
      <LinkText
        path='/user/login'
        component='h3'
        text='Sign In'
        classes={{ link: classes.signIn }}
      />
    );
  }

  function renderLoggedInUser() {
    const token = sessionStorage.getItem("token");
    return (
      <AppBar position='static'>
        <Toolbar>
          <Link to='/user/dashboard' className={classes.iconLink}>
            <RestaurantMenuSharpIcon fontSize='large' />
          </Link>
          <div className={classes.home}>
            <LinkText
              path='/user/dashboard'
              component='h3'
              text='Home'
              classes={{ link: classes.link, text: classes.home }}
            />
          </div>
          <div className={classes.writeReview}>
            <LinkText
              path=''
              component='h3'
              text='Write Review'
              classes={{ link: classes.link, text: classes.home }}
            />
          </div>
          {!token ? renderSignIn() : <AvatarMenu user={user} />}
        </Toolbar>
      </AppBar>
    );
  }
  return <>{renderLoggedInUser()}</>;
};

const mapStateToProps = (state) => {
  const { user, auth } = state;
  return { user, auth };
};

export default connect(mapStateToProps)(Navbar);
