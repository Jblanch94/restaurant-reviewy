import React from 'react';
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

import states from '../assets/states';

type AdminRestaurantFormProps = {
  values: any;
  functions: {
    setName: any;
    setState: any;
    setCity: any;
    setZipcode: any;
  };
  handleChange: (
    fn: (e: React.FormEvent<HTMLInputElement>) => void,
    evt: any
  ) => void;
  handleSubmit: (evt: React.FormEvent<HTMLElement>) => void;
};

const AdminRestaurantForm: React.FC<AdminRestaurantFormProps> = ({
  values,
  functions,
  handleChange,
  handleSubmit,
}) => {
  function renderStateOptions() {
    return states.map((state, index) => {
      return (
        <MenuItem key={index} value={state}>
          {state}
        </MenuItem>
      );
    });
  }

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

        <form onSubmit={handleSubmit}>
          <TextField
            label="Restaurant Name"
            id="restaurant-name"
            name="name"
            required
            value={values.name}
            onChange={(evt) => handleChange(functions.setName, evt)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '1rem' }}
          />

          <TextField
            label="City"
            id="city"
            name="city"
            value={values.city}
            onChange={(evt) => handleChange(functions.setCity, evt)}
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
            value={values.state}
            onChange={(evt) => handleChange(functions.setState, evt)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '1rem' }}
            required
          >
            {renderStateOptions()}
          </Select>

          <TextField
            label="Zipcode"
            id="zipcode"
            name="zipcode"
            required
            onChange={(evt) => handleChange(functions.setZipcode, evt)}
            value={values.zipcode}
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
};

export default AdminRestaurantForm;
