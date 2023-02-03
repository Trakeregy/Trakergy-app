import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { TRIPS_ACTION_TYPES } from '../types';

const getTripInfo = (tripId) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  axios
    .get(`${BASE_URL}/trips/get_all_info/${tripId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: TRIPS_ACTION_TYPES.GET_ALL_INFO,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

const getUserTrips = () => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  axios
    .get(`${BASE_URL}/trips`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const payload = res.data;
        dispatch({
          type: TRIPS_ACTION_TYPES.GET_USER_TRIPS,
          payload,
        });
      }
    })
    .catch((e) => console.error(e.message));
};

export { getTripInfo, getUserTrips };
