import types from '../actions/types';

const initialState = {
  token: null,
  error: '',
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_USER:
      return {
        ...state,
        token: action.payload.token,
        error: '',
      };
    case types.LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        error: '',
      };
    case types.IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case types.LOGOUT:
      return { ...state, token: null, error: '', isAuthenticated: false };
    case types.ERROR:
      return { ...state, error: action.payload.data };
    default:
      return state;
  }
}
