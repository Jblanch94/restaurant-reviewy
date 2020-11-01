import types from "actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case types.FETCH_RESTAURANT_REVIEWS:
      return action.payload;
    case types.SUBMIT_REVIEW:
      return [].concat(state, action.payload);
    default:
      return state;
  }
}
