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
  } else if (action.type === EXPENSES_ACTION_TYPES.EDIT_EXPENSE) {
    const expense = action.payload;
    const oldExpenses = state.tripExpenses[expense.trip.id] ?? [];
    const expenseIndex = (state.tripExpenses[expense.trip.id] ?? []).findIndex(
      (_expense) => _expense.id === expense.id
    );
    const expenseAllIndex = state.allExpensesCurrentUser.findIndex(
      (_expense) => _expense.id === expense.id
    );
    return {
      ...state,
      allExpensesCurrentUser: [
        ...state.allExpensesCurrentUser.slice(0, expenseAllIndex),
        expense,
        ...state.allExpensesCurrentUser.slice(expenseAllIndex + 1),
      ],
      tripExpenses: {
        ...state.tripExpenses,
        [expense.trip.id]: [
          ...oldExpenses.slice(0, expenseIndex),
          expense,
          ...oldExpenses.slice(expenseIndex + 1),
        ],
      },
    };
  }
  return state;
};

export default expensesReducer;
