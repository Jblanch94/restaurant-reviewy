import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  restaurants: restaurantReducer,
  reviews: reviewReducer,
});

export default rootReducer;
