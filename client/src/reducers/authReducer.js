import types from "actions/types";

const initialState = { token: null, error: "", isLoading: true };

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_USER:
      return {
        ...state,
        token: action.payload.token,
        error: "",
        isLoading: false,
      };
    case types.LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        error: "",
        isLoading: false,
      };
    case types.ERROR:
      return { ...state, error: action.payload.data };
    default:
      return state;
  }
}
