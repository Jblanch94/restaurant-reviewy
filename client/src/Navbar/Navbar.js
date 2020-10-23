import React from "react";
import { Link } from "react-router-dom";
import RestaurantMenuSharpIcon from "@material-ui/icons/RestaurantMenuSharp";
import { Typography } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AvatarMenu from "components/AvatarMenu";

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
}));

//TODO: NEED TO IMPLEMENT LOGIC FOR WRITE REVIEW, AUTH AND PROFILE

const Navbar = ({ auth }) => {
  const classes = useStyles();
  function renderLoggedInUser() {
    return (
      <AppBar position='static'>
        <Toolbar>
          <Link to='/user/dashboard' className={classes.iconLink}>
            <RestaurantMenuSharpIcon fontSize='large' />
          </Link>
          <div className={classes.home}>
            <Link to='/user/dashboard' className={classes.link}>
              <Typography
                component='h3'
                align='center'
                className={classes.home}
              >
                Home
              </Typography>
            </Link>
          </div>
          <div className={classes.writeReview}>
            <Link className={classes.link}>
              <Typography
                component='h3'
                align='center'
                className={classes.home}
              >
                Write Review
              </Typography>
            </Link>
          </div>
          <AvatarMenu />
        </Toolbar>
      </AppBar>
    );
  }
  return <>{renderLoggedInUser()}</>;
};

export default Navbar;
