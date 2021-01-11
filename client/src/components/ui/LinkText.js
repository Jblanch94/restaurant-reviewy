import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const LinkText = ({ path, component, classes, text }) => {
  return (
    <Link to={path} className={classes.link}>
      <Typography component={component} align="center" className={classes.text}>
        {text}
      </Typography>
    </Link>
  );
};

export default LinkText;
