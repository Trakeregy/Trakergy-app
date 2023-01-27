import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { PERSONAL_REPORTS_ACTION_TYPES } from '../types';

// TODO: can be removed
const getPersonalSumByType = (year) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  const res = await axios.get(
    `${BASE_URL}/reports/personal/sum_by_type?year=${year}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const payload = res.data;

  dispatch({
    type: PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE,
    payload,
  });
};

const getPersonalSumByTypeLastXYears = (noOfYears) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  const res = await axios.get(
    `${BASE_URL}/reports/personal/sum_by_type?noOfYears=${noOfYears}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const payload = res.data;

  dispatch({
    type: PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE_LAST_X_YEARS,
    payload,
  });
};

const getPersonalYears = () => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  const res = await axios.get(`${BASE_URL}/reports/personal/all_years`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  const payload = res.data;

  dispatch({
    type: PERSONAL_REPORTS_ACTION_TYPES.GET_ALL_YEARS,
    payload,
  });
};

export {
  getPersonalSumByType,
  getPersonalYears,
  getPersonalSumByTypeLastXYears,
};
