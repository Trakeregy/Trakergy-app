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
  } else if (action.type === TRIPS_ACTION_TYPES.ADD_TRIP) {
    return {
      ...state,
      trips: [...state.trips, action.payload],
    };
  } else if (action.type === TRIPS_ACTION_TYPES.DELETE_TRIP) {
    const tripId = action.payload;
    const tripIndex = state.trips.findIndex((trip) => trip.id === tripId);
    return {
      ...state,
      trips: [
        ...state.trips.slice(0, tripIndex),
        ...state.trips.slice(tripIndex + 1),
      ],
    };
  } else if (action.type === TRIPS_ACTION_TYPES.EDIT_TRIP) {
    const trip = action.payload;
    const tripIndex = state.trips.findIndex((_trip) => _trip.id === trip.id);
    return {
      ...state,
      trips: [
        ...state.trips.slice(0, tripIndex),
        trip,
        ...state.trips.slice(tripIndex + 1),
      ],
    };
  } else if (action.type === TRIPS_ACTION_TYPES.UPDATE_MEMBERS) {
    const { id, members } = action.payload;
    const tripIndex = state.trips.findIndex((_trip) => _trip.id === id);
    return {
      ...state,
      trips: [
        ...state.trips.slice(0, tripIndex),
        {
          ...state.trips[tripIndex],
          members,
        },
        ...state.trips.slice(tripIndex + 1),
      ],
    };
  }
  return state;
};

export default tripsReducer;
