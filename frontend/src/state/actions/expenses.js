import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { EXPENSES_ACTION_TYPES } from '../types';

const getExpensesSpecificTrips = (tripIds) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  let params = '';
  tripIds.forEach((id) => {
    params += `tripId=${id}&`;
  });

  axios
    .get(`${BASE_URL}/expenses/specific_trips?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: EXPENSES_ACTION_TYPES.GET_EXPENSES_SPECIFIC_TRIPS,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

const getAllTags = () => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .get(`${BASE_URL}/expenses/tags`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        return res.data;
      }
    })
    .catch((e) => console.error(e.message));
};

const addExpense = (expense) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .post(`${BASE_URL}/expenses/${expense.trip}`, expense, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        Promise.resolve(
          dispatch({
            type: EXPENSES_ACTION_TYPES.ADD_EXPENSE,
            payload: res.data,
          })
        ).then(() => dispatch(getExpensesSpecificTrips([tripId])));
      }
    });
};

const editExpense = (expense) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .patch(`${BASE_URL}/expenses/update/${expense.id}`, expense, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        dispatch({
          type: EXPENSES_ACTION_TYPES.EDIT_EXPENSE,
          payload: res.data,
        });
      }
    });
};

const deleteExpense = (expenseId) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .delete(`${BASE_URL}/expenses/delete/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      dispatch({
        type: EXPENSES_ACTION_TYPES.DELETE_EXPENSE,
        payload: {
          expenseId,
        },
      });
    });
};

export {
  addExpense,
  getAllTags,
  getExpensesSpecificTrips,
  editExpense,
  deleteExpense,
};
