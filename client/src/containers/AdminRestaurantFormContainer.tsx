import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminRestaurantForm from '../AdminRestaurantForm/AdminRestaurantForm';
import { addRestaurant } from '../actions/restaurantActions';

const AdminRestaurantFormContainer: React.FC = () => {
  //hooks to get access to history and dispatch
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');

  //fix evt type
  function handleChange(
    fn: (e: React.FormEvent<HTMLInputElement>) => void,
    evt: any
  ) {
    fn(evt.target.value);
  }

  function handleSubmit(evt: React.FormEvent<HTMLElement>): void {
    evt.preventDefault();

    const formValues: {} = {
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
      handleChange={handleChange}
      functions={{ setName, setState, setCity, setZipcode }}
    />
  );
};

export default AdminRestaurantFormContainer;
