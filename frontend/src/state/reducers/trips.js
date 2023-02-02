import { TRIPS_ACTION_TYPES } from '../types';

export const TripsState = {
  tripInfo: {},
  trips: [],
};

const tripsReducer = (state = TripsState, action) => {
  if (action.type === TRIPS_ACTION_TYPES.GET_ALL_INFO) {
    const tripInfo = action.payload;
    return {
      ...state,
      tripInfo,
    };
  } else if (action.type === TRIPS_ACTION_TYPES.GET_USER_TRIPS) {
    const trips = action.payload;
    return {
      ...state,
      trips,
    };
  }
  return state;
};

export default tripsReducer;
