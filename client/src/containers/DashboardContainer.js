import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllRestaurants } from 'actions/restaurantActions';
import Dashboard from 'components/pages/Dashboard';

const DashboardContainer = () => {
  const restaurants = useSelector((state) => state.restaurants);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  return <Dashboard user={user} restaurants={restaurants} />;
};

export default DashboardContainer;
