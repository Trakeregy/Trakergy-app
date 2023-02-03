import { EXPENSES_ACTION_TYPES } from '../types';

export const ExpenseState = {
  allExpensesCurrentUser: [],
};

const expensesReducer = (state = ExpenseState, action) => {
  if (action.type === EXPENSES_ACTION_TYPES.GET_EXPENSES_SPECIFIC_TRIPS) {
    const allExpensesCurrentUser = action.payload;
    return {
      ...state,
      allExpensesCurrentUser,
    };
  }
  return state;
};

export default expensesReducer;
