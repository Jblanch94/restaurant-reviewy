import React from 'react';
import {
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextareaAutosize,
  Container,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import useStyles from 'assets/styles/ReviewForm';

const ReviewForm = ({
  restaurants,
  onHandleChange,
  onHandleSelectedRestaurantChange,
  onHandleRatingChange,
  onFormSubmit,
  values,
  functions,
}) => {
  const classes = useStyles();

  const renderMenuItems = () => {
    return restaurants.map((restaurant) => {
      return (
        <MenuItem
          key={restaurant.restaurant_id}
          value={restaurant.restaurant_name}
          id={restaurant.restaurant_id}
        >
          {restaurant.restaurant_name}
        </MenuItem>
      );
    });
  };

  return (
    <Container className={classes.container}>
      <form onSubmit={onFormSubmit}>
        <Typography variant="h2" style={{ marginBottom: '5rem' }}>
          Review Form
        </Typography>

        <InputLabel id="select-restaurant-label">Restaurant</InputLabel>
        <div className={classes.header}>
          <Select
            required
            labelId="select-restaurant-label"
            name="selectedRestaurant"
            id="select-restaurant"
            fullWidth
            value={values.selectedRestaurant}
            onChange={(evt, child) =>
              onHandleSelectedRestaurantChange(evt, child)
            }
          >
            {renderMenuItems()}
          </Select>
        </div>
        <div className={classes.ratingContainer}>
          <Rating
            name="rating"
            value={values.rating}
            onChange={onHandleRatingChange}
          />
        </div>
        <div className={classes.reviewContainer}>
          <TextareaAutosize
            aria-label="review"
            name="review"
            rowsMin={3}
            placeholder="Enter your review..."
            value={values.review}
            onChange={(evt) => onHandleChange(evt, functions.setReview)}
          />
        </div>

        <Button type="submit" color="primary" variant="outlined">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ReviewForm;
