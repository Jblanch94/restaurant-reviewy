import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  TextField,
  Container,
  Button,
  InputLabel,
  Select,
  MenuItem,
  CssBaseline,
} from '@material-ui/core';

import states from 'assets/states';
import { addRestaurant } from 'actions';

class AdminRestaurantForm extends Component {
  state = { name: '', city: '', state: '', zipcode: '' };

  onHandleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();

    const formValues = {
      restaurant_name: this.state.name,
      restaurant_city: this.state.city,
      restaurant_state: this.state.state,
      restaurant_zipcode: this.state.zipcode,
    };

    this.props.addRestaurant(formValues, this.props.history);
  };

  renderStateOptions = () => {
    return states.map((state, index) => {
      return (
        <MenuItem key={index} value={state}>
          {state}
        </MenuItem>
      );
    });
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            marginTop: '3rem',
          }}
        >
          <Typography
            component="h2"
            variant="h2"
            style={{ marginBottom: '0.5rem' }}
          >
            Add Restaurant
          </Typography>

          <form onSubmit={this.onFormSubmit}>
            <TextField
              label="Restaurant Name"
              id="restaurant-name"
              name="name"
              required
              value={this.state.name}
              onChange={this.onHandleChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />

            <TextField
              label="City"
              id="city"
              name="city"
              value={this.state.city}
              onChange={this.onHandleChange}
              required
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />

            <InputLabel id="state">State</InputLabel>
            <Select
              labelId="state"
              id="state"
              name="state"
              value={this.state.state}
              onChange={this.onHandleChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
              required
            >
              {this.renderStateOptions()}
            </Select>

            <TextField
              label="Zipcode"
              id="zipcode"
              name="zipcode"
              required
              onChange={this.onHandleChange}
              value={this.state.zipcode}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Restaurant
            </Button>
          </form>
        </Container>
      </>
    );
  }
}

export default connect(null, { addRestaurant })(
  withRouter(AdminRestaurantForm)
);
