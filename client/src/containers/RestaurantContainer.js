import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRestaurantReviews } from '../actions/reviewActions';
import Restaurant from '../components/pages/Restaurant';

const RestaurantContainer = (props) => {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  let restaurant;
  if (reviews.length) {
    restaurant = reviews[0].restaurant_name;
  }

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(fetchRestaurantReviews(id));
  }, [dispatch, props.match.params, props.match.params.id]);

  return <Restaurant reviews={reviews} restaurant={restaurant} />;
};

export default RestaurantContainer;
