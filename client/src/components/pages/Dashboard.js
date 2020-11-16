import React from 'react';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import RestaurantCard from 'components/ui/RestaurantCard';
import useStyles from 'assets/styles/Dashboard';

const Dashboard = ({ user, restaurants }) => {
  const classes = useStyles();

  function renderRestaurantCards() {
    return restaurants.map(
      ({
        restaurant_id,
        restaurant_name,
        restaurant_city,
        restaurant_state,
        rating,
      }) => {
        return (
          <RestaurantCard
            key={restaurant_id}
            id={restaurant_id}
            name={restaurant_name}
            city={restaurant_city}
            state={restaurant_state}
            rating={rating}
            user={user}
          />
        );
      }
    );
  }

  function renderFab() {
    if (user.isadmin) {
      return (
        <Link to="/admin/restaurant-form">
          <Fab color="primary" size="large" className={classes.dashboardFab}>
            <Add />
          </Fab>
        </Link>
      );
    } else return null;
  }

  return (
    <div className={classes.dashboardContainer}>
      {renderRestaurantCards()}
      {renderFab()}
    </div>
  );
};

export default Dashboard;
