import React from 'react';
import { Link } from 'react-router-dom';
import { Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import RestaurantCard from '../ui/RestaurantCard';
import useStyles from '../../assets/styles/Dashboard';

const Dashboard = ({ user, restaurants }) => {
  const classes = useStyles();

  function renderRestaurantCards() {
    return restaurants.map(
      ({
        restaurant_id,
        restaurant_name,
        restaurant_city,
        restaurant_state,
        avg_rating,
      }) => {
        return (
          <RestaurantCard
            key={restaurant_id}
            id={restaurant_id}
            name={restaurant_name}
            city={restaurant_city}
            state={restaurant_state}
            avg_rating={avg_rating}
            user={user}
          />
        );
      }
    );
  }

  const fab = (
    <Link to="/admin/restaurant-form">
      <Fab
        color="primary"
        size="large"
        className={classes.dashboardFab}
        data-testid="fab">
        <Add />
      </Fab>
    </Link>
  );

  return (
    <main data-testid="Dashboard">
      <Typography
        className={classes.dashboardHeader}
        variant="h1"
        component="h1">
        Restaurant Reviewy
      </Typography>
      <div className={classes.dashboardContainer}>
        {renderRestaurantCards()}
        {user.user.isadmin && fab}
      </div>
    </main>
  );
};

export default Dashboard;
