import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserRestaurantCard from 'components/UserRestaurantCard';
import { getAllRestaurants } from 'actions';

class UserDashboard extends Component {
  componentDidMount() {
    this.props.getAllRestaurants();
  }

  renderContent = () => {
    const { restaurants } = this.props;
    return restaurants.map((restaurant) => {
      const {
        restaurant_id,
        restaurant_name,
        restaurant_city,
        restaurant_state,
        average_rating,
      } = restaurant;
      return (
        <UserRestaurantCard
          key={restaurant_id}
          id={restaurant_id}
          name={restaurant_name}
          city={restaurant_city}
          state={restaurant_state}
          rating={average_rating}
        />
      );
    });
  };

  render() {
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
          {this.renderContent()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
  };
};

export default connect(mapStateToProps, { getAllRestaurants })(UserDashboard);
