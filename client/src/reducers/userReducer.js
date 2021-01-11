import types from '../actions/types';

const initialState = {
  user: {},
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return { ...state, user: action.payload };
    case types.FETCH_USER_BY_ID:
      return { ...state, users: [...state.users, action.payload] };
    case types.LOGOUT:
      return { ...state, user: {} };
    case types.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
