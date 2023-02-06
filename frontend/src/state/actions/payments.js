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

export { getUserDebts };
