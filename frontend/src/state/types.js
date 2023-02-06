const AUTH_ACTION_TYPES = {
  ERROR: "ERROR",
  SIGN_UP: "SIGN_UP",
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
  GET_CURRENT_USER: "GET_CURRENT_USER",
};

const PERSONAL_REPORTS_ACTION_TYPES = {
  GET_ALL_YEARS: "GET_ALL_YEARS",
  SUM_BY_TYPE_BY_MONTH: "SUM_BY_TYPE_BY_MONTH",
  SUM_BY_TYPE_LAST_X_YEARS: "SUM_BY_TYPE_LAST_X_YEARS",
  GET_ALL_YEARS_DAILY_COUNT: "GET_ALL_YEARS_DAILY_COUNT",
  GET_SUM_PER_COUNTRY: "GET_SUM_PER_COUNTRY",
};

const TRIPS_ACTION_TYPES = {
  GET_ALL_INFO: "GET_ALL_INFO",
  GET_USER_TRIPS: "GET_USER_TRIPS",
  ADD_TRIP: "ADD_TRIP",
  DELETE_TRIP: "DELETE_TRIP",
  EDIT_TRIP: "EDIT_TRIP",
  UPDATE_MEMBERS: "UPDATE_MEMBERS",
};

const EXPENSES_ACTION_TYPES = {
  ADD_EXPENSE: "ADD_EXPENSE",
  GET_EXPENSES_SPECIFIC_TRIPS: "GET_EXPENSES_SPECIFIC_TRIPS",
  EDIT_EXPENSE: "EDIT_EXPENSE",
  DELETE_EXPENSE: "DELETE_EXPENSE",
};

const USER_ACTION_TYPES = {
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  UPDATE_INFO: "UPDATE_INFO",
  UPLOAD_IMAGE: "UPLOAD_IMAGE",
};

export {
  AUTH_ACTION_TYPES,
  PERSONAL_REPORTS_ACTION_TYPES,
  TRIPS_ACTION_TYPES,
  EXPENSES_ACTION_TYPES,
  USER_ACTION_TYPES,
};
