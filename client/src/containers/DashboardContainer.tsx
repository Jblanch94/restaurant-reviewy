import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllRestaurants } from '../actions/restaurantActions';
import { RootState } from '../reducers';
import Dashboard from '../components/pages/Dashboard';

const DashboardContainer: React.FC = () => {
  const restaurants = useSelector((state: RootState) => state.restaurants);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  console.log('restaurants', restaurants);

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  return <Dashboard user={user} restaurants={restaurants} />;
};

export default DashboardContainer;
