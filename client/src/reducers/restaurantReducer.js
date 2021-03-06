import types from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case types.FETCH_RESTAURANTS:
      return action.payload;
    default:
      return state;
  }
}
