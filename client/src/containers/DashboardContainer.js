import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useActions from '../hooks/useActions';
import Dashboard from '../components/pages/Dashboard';

const DashboardContainer = () => {
  const restaurants = useSelector((state) => state.restaurants);
  const user = useSelector((state) => state.user);
  const { restaurantActions } = useActions();

  useEffect(() => {
    restaurantActions.getAllRestaurantsAndAvgRating();
  }, []);

  return <Dashboard user={user} restaurants={restaurants} />;
};

export default DashboardContainer;
