import { combineReducers } from "redux";
import authReducer from "reducers/authReducer";
import userReducer from "reducers/userReducer";
import restaurantReducer from "reducers/restaurantReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  restaurants: restaurantReducer,
});
