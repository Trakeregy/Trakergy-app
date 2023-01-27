import { combineReducers } from 'redux';
import { AUTH_ACTION_TYPES } from '../types.js';
import authReducer from './auth.js';
import personalReportsReducer from './reports.js';

const appReducer = combineReducers({
  auth: authReducer,
  personalReports: personalReportsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_ACTION_TYPES.LOG_OUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
