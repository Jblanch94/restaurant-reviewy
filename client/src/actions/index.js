import types from "actions/types";
import axios from "axios";

export const registerUser = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/restaurant-reviewy/auth/register",
        formValues
      );
      console.log("register user response", response);
      dispatch({
        type: types.REGISTER_USER,
        payload: response.data,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const loginUser = (formValues) => {
  return async (dispatch) => {
    let response;
    try {
      response = await axios.post(
        "http://localhost:5000/api/restaurant-reviewy/auth/login",
        formValues
      );
      dispatch({
        type: types.LOGIN_USER,
        payload: response.data,
      });

      //if there is error
    } catch (err) {
      console.error(err.message);
      dispatch({
        type: types.ERROR,
        payload: err.response,
      });
    }
  };
};
