import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "actions";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onHandleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.loginUser(
      {
        username: this.state.username,
        password: this.state.password,
      },
      this.props.history
    );
  };

  render() {
    return (
      <Container maxWidth='sm' component='section'>
        <form autoComplete='false' onSubmit={this.onFormSubmit}>
          <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Login</h1>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                variant='outlined'
                label='Username'
                id='username'
                name='username'
                type='text'
                onChange={this.onHandleChange}
                value={this.state.username}
                required
                fullWidth
                error={this.props.auth.error !== ""}
                helperText={this.props.auth.error}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                variant='outlined'
                label='Password'
                id='password'
                name='password'
                type='password'
                onChange={this.onHandleChange}
                value={this.state.password}
                required
                fullWidth
                error={this.props.auth.error !== ""}
                helperText={this.props.auth.error}
              />
            </Grid>
            <Button variant='contained' type='submit' color='primary' fullWidth>
              Login
            </Button>
          </Grid>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
