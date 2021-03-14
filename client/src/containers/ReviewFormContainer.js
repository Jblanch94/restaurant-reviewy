import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllRestaurants } from '../actions/restaurantActions';
import { submitReview } from '../actions/reviewActions';
import ReviewForm from '../components/pages/ReviewForm';
import useInput from '../hooks/useInput';

const ReviewFormContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants);
  const auth = useSelector((state) => state.auth);
  const [rating, onHandleRating] = useInput(0);
  const [review, onHandleReview] = useInput('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push('/user/login');
    }

    dispatch(getAllRestaurants());
  }, [auth.isAuthenticated, dispatch, history]);

  const onHandleSelectedRestaurantChange = (evt, child) => {
    setSelectedRestaurant(evt.target.value);
    setRestaurantId(child.props.id);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const formValues = { stars: parseInt(rating), review };
    dispatch(submitReview(formValues, restaurantId, history));

    //clear form
    setSelectedRestaurant('');
    setRestaurantId(null);
  };

  return (
    <ReviewForm
      restaurants={restaurants}
      onHandleSelectedRestaurantChange={onHandleSelectedRestaurantChange}
      onFormSubmit={onFormSubmit}
      values={{ rating, review, selectedRestaurant, restaurantId }}
      functions={{
        onHandleRating,
        onHandleReview,
        setSelectedRestaurant,
        setRestaurantId,
      }}
    />
  );
};

export default ReviewFormContainer;
