import { combineReducers } from 'redux';
import { AUTH_ACTION_TYPES } from '../types.js';
import authReducer from './auth.js';
import expensesReducer from './expenses.js';
import personalReportsReducer from './reports.js';
import tripsReducer from './trips.js';
import userReducer from './user.js';
import paymentsReducer from './payments.js';

const appReducer = combineReducers({
  auth: authReducer,
  personalReports: personalReportsReducer,
  trips: tripsReducer,
  expenses: expensesReducer,
  user: userReducer,
  payments: paymentsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_ACTION_TYPES.LOG_OUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
