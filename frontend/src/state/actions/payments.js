import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { PAYMENTS_ACTION_TYPES } from '../types';

const getUserDebts = () => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  axios
    .get(`${BASE_URL}/debts`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: PAYMENTS_ACTION_TYPES.GET_USER_DEBTS,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

const completePayment =
  ({ expenseId, userId, isPaid }) =>
  async (dispatch) => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    axios
      .patch(
        `${BASE_URL}/debts`,
        {
          expenseId,
          userId,
          isPaid: isPaid !== undefined && isPaid !== null ? isPaid : true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          dispatch(getUserDebts());
        }
      })
      .catch((e) => console.error(e.message));
  };

const sendReminderEmail = (body) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  await axios.post(`${BASE_URL}/email/reminder`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  dispatch({ type: PAYMENTS_ACTION_TYPES.SEND_REMINDER_EMAIL });
};

export { getUserDebts, completePayment, sendReminderEmail };
