import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Restaurant from '../components/pages/Restaurant';
import useActions from '../hooks/useActions';

const RestaurantContainer = (props) => {
  const reviews = useSelector((state) => state.reviews);
  const { reviewActions } = useActions();

  let restaurant;
  if (reviews.length) {
    restaurant = reviews[0].restaurant_name;
  }

  useEffect(() => {
    const { id } = props.match.params;
    reviewActions.fetchRestaurantReviews(id);
  }, [props.match.params, props.match.params.id]);

  return <Restaurant reviews={reviews} restaurant={restaurant} />;
};

export default RestaurantContainer;
