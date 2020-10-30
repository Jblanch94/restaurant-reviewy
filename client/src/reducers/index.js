import { combineReducers } from "redux";
import authReducer from "reducers/authReducer";
import userReducer from "reducers/userReducer";
import restaurantReducer from "reducers/restaurantReducer";
import reviewReducer from "reducers/reviewReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  restaurants: restaurantReducer,
  reviews: reviewReducer,
});
