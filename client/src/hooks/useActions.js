import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';

const useActions = () => {
  const dispatch = useDispatch();
  const authActions = bindActionCreators(actions.authActions, dispatch);
  const userActions = bindActionCreators(actions.userActions, dispatch);
  const restaurantActions = bindActionCreators(
    actions.restaurantActions,
    dispatch
  );
  const reviewActions = bindActionCreators(actions.reviewActions, dispatch);
  return { authActions, userActions, restaurantActions, reviewActions };
};

export default useActions;
