import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAllRestaurants } from '../actions/restaurantActions';
import { submitReview } from '../actions/reviewActions';
import ReviewForm from '../components/pages/ReviewForm';

const ReviewFormContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants);
  const auth = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push('/user/login');
    }

    dispatch(getAllRestaurants());
  }, [auth.isAuthenticated, dispatch, history]);

  const onHandleChange = (evt, fn) => fn(evt.target.value);

  const onHandleSelectedRestaurantChange = (evt, child) => {
    setSelectedRestaurant(evt.target.value);
    setRestaurantId(child.props.id);
  };

  const onHandleRatingChange = (evt) => setRating(parseInt(evt.target.value));

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const formValues = { stars: rating, review };
    dispatch(submitReview(formValues, restaurantId, history));

    //clear form
    setRating(0);
    setReview('');
    setSelectedRestaurant('');
    setRestaurantId(null);
  };

  return (
    <ReviewForm
      restaurants={restaurants}
      onHandleChange={onHandleChange}
      onHandleSelectedRestaurantChange={onHandleSelectedRestaurantChange}
      onHandleRatingChange={onHandleRatingChange}
      onFormSubmit={onFormSubmit}
      values={{ rating, review, selectedRestaurant, restaurantId }}
      functions={{
        setRating,
        setReview,
        setSelectedRestaurant,
        setRestaurantId,
      }}
    />
  );
};

export default ReviewFormContainer;
