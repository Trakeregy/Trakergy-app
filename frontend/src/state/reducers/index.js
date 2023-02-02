import { combineReducers } from 'redux';
import { AUTH_ACTION_TYPES } from '../types.js';
import authReducer from './auth.js';
import personalReportsReducer from './reports.js';
import tripsReducer from './trips.js';

const appReducer = combineReducers({
  auth: authReducer,
  personalReports: personalReportsReducer,
  trips: tripsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_ACTION_TYPES.LOG_OUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
