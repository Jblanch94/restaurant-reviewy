import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { getAllRestaurants } from 'actions';
import AdminRestaurantCard from 'components/AdminRestaurantCard';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getAllRestaurants();
  }

  renderRestaurantCards() {
    return this.props.restaurants.map((restaurant) => {
      return (
        <AdminRestaurantCard
          key={restaurant.restaurant_id}
          name={restaurant.restaurant_name}
          city={restaurant.restaurant_city}
          state={restaurant.restaurant_state}
          rating={restaurant.restaurant_rating}
        />
      );
    });
  }

  render() {
    const style = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    };

    return (
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {this.renderRestaurantCards()}
        </div>
        <Link to="/admin/restaurant-form">
          <Fab color="primary" size="large" style={style}>
            <Add />
          </Fab>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
  };
};

export default connect(mapStateToProps, { getAllRestaurants })(AdminDashboard);
