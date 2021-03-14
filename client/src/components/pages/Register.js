import React from 'react';
import { TextField, Container, Grid, Button } from '@material-ui/core';

import useStyles from '../../assets/styles/Register';

const Register = ({ onFormSubmit, functions, values }) => {
  const classes = useStyles();

  return (
    <Container component="section" maxWidth="sm">
      <h1 className={classes.formHeader}>REGISTER</h1>
      <form autoComplete="false" onSubmit={onFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              error={values.errors.first_name !== undefined}
              helperText={values.errors.first_name}
              variant="outlined"
              label="First Name"
              id="first_name"
              name="first_name"
              type="text"
              onChange={functions.onHandleFirstName}
              value={values.first_name}
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              error={values.errors.last_name !== undefined}
              helperText={values.errors.last_name}
              variant="outlined"
              label="Last Name"
              id="last_name"
              name="last_name"
              type="text"
              onChange={functions.onHandleLastName}
              value={values.last_name}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={values.errors.username !== undefined}
              helperText={values.errors.username}
              variant="outlined"
              label="Username"
              id="username"
              name="username"
              type="text"
              onChange={functions.onHandleUsername}
              value={values.username}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={values.errors.password !== undefined}
              helperText={values.errors.password}
              variant="outlined"
              label="Password"
              id="password"
              name="password"
              type="password"
              onChange={functions.onHandlePassword}
              value={values.password}
              required
              fullWidth
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Register
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
