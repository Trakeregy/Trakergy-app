import { PERSONAL_REPORTS_ACTION_TYPES } from '../types';

export const ReportState = {
    sumByType: [],
};

const personalReportsReducer = (state = ReportState, action) => {
    if (action.type === PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE) {
        let sumByType = action.payload;
        return {
            ...state,
            sumByType,
        };
    } else if (action.type === PERSONAL_REPORTS_ACTION_TYPES.GET_ALL_YEARS) {
        let years = action.payload;
        return {
            ...state,
            years,
        };
    } else if (
        action.type === PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE_LAST_X_YEARS
    ) {
        let expensesPerYear = action.payload;
        return {
            ...state,
            expensesPerYear,
        };
    }
    return state;
};

export default personalReportsReducer;
