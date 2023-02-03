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

export { getExpensesSpecificTrips };
