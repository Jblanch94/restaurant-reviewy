import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRestaurantReviews } from '../actions/reviewActions';
import { RootState } from '../reducers';
import Restaurant from '../components/pages/Restaurant';

type RestaurantContainerProps = {
  history: unknown;
  location: unknown;
  match: any;
};

const RestaurantContainer: React.FC<RestaurantContainerProps> = (props) => {
  const reviews = useSelector((state: RootState) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(fetchRestaurantReviews(id));
  }, [dispatch, props.match.params]);

  return <Restaurant reviews={reviews} />;
};

export default RestaurantContainer;
