import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { PERSONAL_REPORTS_ACTION_TYPES } from '../types';

const getPersonalSumByTypeByMonth = () => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  axios
    .get(`${BASE_URL}/reports/personal/sum_by_type_by_month`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE_BY_MONTH,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

const getPersonalSumByTypeLastXYears = (noOfYears) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  axios
    .get(`${BASE_URL}/reports/personal/sum_by_type?noOfYears=${noOfYears}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE_LAST_X_YEARS,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

const getPersonalYears = () => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  axios
    .get(`${BASE_URL}/reports/personal/all_years`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: PERSONAL_REPORTS_ACTION_TYPES.GET_ALL_YEARS,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

const getPersonalDailyAllYears = () => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  axios
    .get(`${BASE_URL}/reports/personal/daily_all_years`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: PERSONAL_REPORTS_ACTION_TYPES.GET_ALL_YEARS_DAILY_COUNT,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

const getPersonalExpensesByCountry = () => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  axios
    .get(`${BASE_URL}/reports/personal/sum_per_country`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: PERSONAL_REPORTS_ACTION_TYPES.GET_SUM_PER_COUNTRY,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

export {
  getPersonalSumByTypeByMonth,
  getPersonalYears,
  getPersonalSumByTypeLastXYears,
  getPersonalDailyAllYears,
  getPersonalExpensesByCountry,
};
