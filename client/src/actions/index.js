import types from "actions/types";
import axiosAuth from "axios/axiosAuth";
import axiosUser from "axios/axiosUser";

export const registerUser = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await axiosAuth.post("/register", formValues);
      sessionStorage.setItem("token", response.data.token);
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
      response = await axiosAuth.post("/login", formValues);
      sessionStorage.setItem("token", response.data.token);
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

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem("token");
      let response;

      response = await axiosUser.get("/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("fetched user response", response.data);
      dispatch({
        type: types.FETCH_USER,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: types.ERROR, payload: err.response });
    }
  };
};

export const updateUser = (formValues) => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axiosUser.patch("/", formValues, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      dispatch({ type: types.UPDATE_USER });
    } catch (err) {
      dispatch({ type: types.ERROR, payload: err.response });
    }
  };
};

export const logout = () => {
  sessionStorage.removeItem("token");
  return { type: types.LOGOUT };
};
