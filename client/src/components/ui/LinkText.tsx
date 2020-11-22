import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

type LinkTextProps = {
  path: string;
  component: React.ElementType<any>;
  classes: {
    link?: string;
    text?: string;
  };
  text: string;
};

const LinkText: React.FC<LinkTextProps> = ({
  path,
  component,
  classes,
  text,
}) => {
  return (
    <Link to={path} className={classes.link}>
      <Typography component={component} align="center" className={classes.text}>
        {text}
      </Typography>
    </Link>
  );
};

export default LinkText;
