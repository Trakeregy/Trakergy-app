import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { TRIPS_ACTION_TYPES } from '../types';
import { UNSPLASH_CLIENT_SECRET } from './secrets';

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

const addTrip = (trip) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .post(`${BASE_URL}/trips/add`, trip, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        dispatch({
          type: TRIPS_ACTION_TYPES.ADD_TRIP,
          payload: res.data,
        });
      }
    });
};

const editTrip = (trip) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .patch(`${BASE_URL}/trips/get_all_info/${trip.id}`, trip, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        dispatch({
          type: TRIPS_ACTION_TYPES.EDIT_TRIP,
          payload: res.data,
        });
      }
    });
};

const deleteTrip = (tripId) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .delete(`${BASE_URL}/trips/get_all_info/${tripId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      dispatch({
        type: TRIPS_ACTION_TYPES.DELETE_TRIP,
        payload: {
          tripId,
        },
      });
    });
};
const getAllLocations = () => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .get(`${BASE_URL}/locations`, {
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

const getRandomPhotoLocation = (locationName) => {
  const name = locationName;
  return axios
    .get(
      `https://api.unsplash.com/search/photos?query=${name}&per_page=1&page=1&order_by=relevant`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Client-ID ${UNSPLASH_CLIENT_SECRET}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        return res.data;
      }
    })
    .catch((e) => console.error(e.message));
};

const updateMembers = (tripId, members) => async (dispatch) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return axios
    .patch(
      `${BASE_URL}/trips/get_all_info/${tripId}`,
      { members },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        dispatch({
          type: TRIPS_ACTION_TYPES.UPDATE_MEMBERS,
          payload: res.data,
        });
      }
    });
};

export {
  addTrip,
  deleteTrip,
  getAllLocations,
  getRandomPhotoLocation,
  getTripInfo,
  getUserTrips,
  editTrip,
  updateMembers,
};
