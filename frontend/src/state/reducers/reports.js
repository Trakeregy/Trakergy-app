import { PERSONAL_REPORTS_ACTION_TYPES } from '../types';

export const ReportState = {
  sumByType: [],
};

const personalReportsReducer = (state = ReportState, action) => {
  if (action.type === PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE_BY_MONTH) {
    const sumByTypeByMonth = action.payload;
    return {
      ...state,
      sumByTypeByMonth,
    };
  } else if (action.type === PERSONAL_REPORTS_ACTION_TYPES.GET_ALL_YEARS) {
    const years = action.payload;
    return {
      ...state,
      years,
    };
  } else if (
    action.type === PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE_LAST_X_YEARS
  ) {
    const expensesPerYear = action.payload;
    return {
      ...state,
      expensesPerYear,
    };
  } else if (
    action.type === PERSONAL_REPORTS_ACTION_TYPES.GET_ALL_YEARS_DAILY_COUNT
  ) {
    const dailyCountAllYears = action.payload;
    return {
      ...state,
      dailyCountAllYears,
    };
  } else if (
    action.type === PERSONAL_REPORTS_ACTION_TYPES.GET_SUM_PER_COUNTRY
  ) {
    const sumPerCountry = action.payload;
    return {
      ...state,
      sumPerCountry,
    };
  }
  return state;
};

export default personalReportsReducer;
