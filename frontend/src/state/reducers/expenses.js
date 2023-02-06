import { EXPENSES_ACTION_TYPES } from '../types';

export const ExpenseState = {
  allExpensesCurrentUser: [],
  tripExpenses: {},
};

const expensesReducer = (state = ExpenseState, action) => {
  if (action.type === EXPENSES_ACTION_TYPES.GET_EXPENSES_SPECIFIC_TRIPS) {
    const allExpensesCurrentUser = action.payload;
    return {
      ...state,
      allExpensesCurrentUser,
    };
  } else if (action.type === EXPENSES_ACTION_TYPES.ADD_EXPENSE) {
    const expense = action.payload;
    const oldExpenses = state.tripExpenses[expense.trip.id] ?? [];
    return {
      ...state,
      allExpensesCurrentUser: [...state.allExpensesCurrentUser, expense],
      tripExpenses: {
        ...state.tripExpenses,
        [expense.trip.id]: [...oldExpenses, expense],
      },
    };
  }
  return state;
};

export default expensesReducer;
