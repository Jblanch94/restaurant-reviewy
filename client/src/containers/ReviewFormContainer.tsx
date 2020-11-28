import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAllRestaurants } from '../actions/restaurantActions';
import { RootState } from '../reducers';
import { submitReview } from '../actions/reviewActions';
import ReviewForm from '../components/pages/ReviewForm';

const ReviewFormContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurants);
  const auth = useSelector((state: RootState) => state.auth);

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

  const onHandleChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    fn: (e: any) => void
  ) => fn(evt.target.value);

  const onHandleSelectedRestaurantChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    child: any
  ) => {
    setSelectedRestaurant(evt.target.value);
    setRestaurantId(child.props.id);
  };

  const onHandleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setRating(parseInt(evt.target.value));

  const onFormSubmit = (evt: React.FormEvent) => {
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
