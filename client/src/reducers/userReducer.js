import types from "actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload;
    case types.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
