import React from 'react';
import {
  TextField,
  Container,
  Grid,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from '../../assets/styles/Login';

const Login = ({
  auth,
  username,
  password,
  onFormSubmit,
  onHandleUsername,
  onHandlePassword,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" component="section">
      <form autoComplete="false" onSubmit={onFormSubmit}>
        <h1
          style={{ textAlign: 'center', fontSize: '2rem' }}
          className={classes.header}>
          Login
        </h1>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item sm={12}>
            <TextField
              variant="outlined"
              label="Username"
              id="username"
              name="username"
              type="text"
              onChange={onHandleUsername}
              value={username}
              required
              fullWidth
              error={auth.error !== ''}
              helperText={auth.error}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              variant="outlined"
              label="Password"
              id="password"
              name="password"
              type="password"
              onChange={onHandlePassword}
              value={password}
              required
              fullWidth
              error={auth.error !== ''}
              helperText={auth.error}
            />
          </Grid>

          <Button variant="contained" type="submit" color="primary" fullWidth>
            Login
          </Button>
          <Container className={classes.container}>
            <Paper className={classes.paper}>
              <Typography variant="body1" component="p">
                Dont have an account?
              </Typography>

              <Link to="/user/register" className={classes.link}>
                <Typography variant="body1" component="p">
                  Sign Up
                </Typography>
              </Link>
            </Paper>
          </Container>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
