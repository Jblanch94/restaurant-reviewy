import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AdminRestaurantForm from '../components/pages/AdminRestaurantForm';
import { addRestaurant } from '../actions/restaurantActions';
import useInput from '../hooks/useInput';

const AdminRestaurantFormContainer = () => {
  //hooks to get access to history and dispatch
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, onHandleName] = useInput('');
  const [state, onHandleState] = useInput('');
  const [city, onHandleCity] = useInput('');
  const [zipcode, onHandleZipcode] = useInput('');

  function handleSubmit(evt) {
    evt.preventDefault();

    const formValues = {
      restaurant_name: name,
      restaurant_city: city,
      restaurant_state: state,
      restaurant_zipcode: zipcode,
    };

    dispatch(addRestaurant(formValues, history));
  }

  return (
    <AdminRestaurantForm
      handleSubmit={handleSubmit}
      values={{ name, state, city, zipcode }}
      functions={{ onHandleCity, onHandleName, onHandleState, onHandleZipcode }}
    />
  );
};

export default AdminRestaurantFormContainer;
