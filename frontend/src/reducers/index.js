import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './bell_reducer';

const rootReducer = combineReducers({
  form,
  bell: authReducer,
});

export default rootReducer;