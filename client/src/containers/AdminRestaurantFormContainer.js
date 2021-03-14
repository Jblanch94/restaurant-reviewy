import React from 'react';
import { useHistory } from 'react-router-dom';
import AdminRestaurantForm from '../components/pages/AdminRestaurantForm';
import useInput from '../hooks/useInput';
import useActions from '../hooks/useActions';

const AdminRestaurantFormContainer = () => {
  //hooks to get access to history and action creators
  const history = useHistory();
  const { restaurantActions } = useActions();

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

    restaurantActions.addRestaurant(formValues, history);
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
