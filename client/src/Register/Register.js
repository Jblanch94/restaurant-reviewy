import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { registerUser, fetchUser } from "actions";
import "Register/Register.css";

class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    errors: {},
  };

  //handle input change on text fields
  onHandleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  //submit form
  onHandleSubmit = (evt) => {
    //prevent refresh of page
    evt.preventDefault();

    //check for errors
    const formErrors = this.formValidation();
    this.setState({ errors: formErrors });

    //if there are no errors then make api request and clear fields
    if (_.keys(formErrors).length === 0) {
      this.props.registerUser({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        password: this.state.password,
      });
      this.props.fetchUser();
      this.setState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
      });
    }
  };

  //validate form fields
  formValidation = () => {
    let errors = {};
    //check that first name and last name is not empty
    if (this.state.first_name.length === 0) {
      errors.first_name = "Must provide a first name!";
    } else if (this.state.last_name.length === 0) {
      errors.last_name = "Must provide a last name!";
    }

    //check that username has at least 8 characters
    if (this.state.username.length < 8) {
      errors.username = "Username must contain at least 8 characters!";
    }

    //check if it is a valid password
    if (this.state.password.length < 8) {
      errors.password = "Password must contain at least 8 characters!";
    }
    return errors;
  };

  render() {
    return (
      <Container component='section' maxWidth='sm'>
        <h1 className='form-header'>REGISTER</h1>
        <form autoComplete='false' onSubmit={this.onHandleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={this.state.errors.first_name !== undefined}
                helperText={this.state.errors.first_name}
                variant='outlined'
                label='First Name'
                id='first_name'
                name='first_name'
                type='text'
                onChange={this.onHandleChange}
                value={this.state.first_name}
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={this.state.errors.last_name !== undefined}
                helperText={this.state.errors.last_name}
                variant='outlined'
                label='Last Name'
                id='last_name'
                name='last_name'
                type='text'
                onChange={this.onHandleChange}
                value={this.state.last_name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={this.state.errors.username !== undefined}
                helperText={this.state.errors.username}
                variant='outlined'
                label='Username'
                id='username'
                name='username'
                type='text'
                onChange={this.onHandleChange}
                value={this.state.username}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={this.state.errors.password !== undefined}
                helperText={this.state.errors.password}
                variant='outlined'
                label='Password'
                id='password'
                name='password'
                type='password'
                onChange={this.onHandleChange}
                value={this.state.password}
                required
                fullWidth
              />
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Register
            </Button>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default connect(null, { registerUser, fetchUser })(Register);
