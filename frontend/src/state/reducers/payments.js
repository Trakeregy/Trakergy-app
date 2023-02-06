import { PAYMENTS_ACTION_TYPES } from '../types';

export const PaymentState = {
  userDebts: [],
};

const paymentsReducer = (state = PaymentState, action) => {
  if (action.type === PAYMENTS_ACTION_TYPES.GET_USER_DEBTS) {
    const userDebts = action.payload;
    return {
      ...state,
      userDebts,
    };
  }
  return state;
};

export default paymentsReducer;
