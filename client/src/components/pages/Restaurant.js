import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import ReviewCard from '../ui/ReviewCard';
import { useStyles } from '../../assets/styles/Restaurant';

const Restaurant = ({ reviews, restaurant }) => {
  const classes = useStyles();
  const renderContent = () => {
    return reviews.map((review) => {
      return (
        <Grid item xs key={review.review_id}>
          <ReviewCard
            review={review.review}
            rating={review.stars}
            userId={review.user_id}
          />
        </Grid>
      );
    });
  };

  return (
    <main>
      {restaurant && (
        <Typography
          variant="h2"
          component="h2"
          className={classes.restaurantHeader}>
          {restaurant}
        </Typography>
      )}
      <div className={classes.gridContainer}>
        <Grid container spacing={3}>
          {renderContent()}
        </Grid>
      </div>
    </main>
  );
};

export default Restaurant;
