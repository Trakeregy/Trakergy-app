import { TRIPS_ACTION_TYPES, EXPENSES_ACTION_TYPES } from '../types';

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
  } else if (action.type === EXPENSES_ACTION_TYPES.EDIT_EXPENSE) {
    const expense = action.payload;
    if (expense.trip.id === state.tripInfo.id) {
      const expenseIndex = state.tripInfo.expenses?.findIndex(
        (_expense) => _expense.id === expense.id
      );
      if (state.tripInfo.expenses && expenseIndex !== -1) {
        return {
          ...state,
          tripInfo: {
            ...state.tripInfo,
            expenses: [
              ...state.tripInfo.expenses.slice(0, expenseIndex),
              {
                ...expense,
                payer: expense.payer.id,
                users_to_split: expense.users_to_split?.map(
                  (_user) => _user.id
                ),
              },
              ...state.tripInfo.expenses.slice(expenseIndex + 1),
            ],
          },
        };
      }
    }
  } else if (action.type === EXPENSES_ACTION_TYPES.ADD_EXPENSE) {
    const expense = action.payload;
    if (expense.trip.id === state.tripInfo.id) {
      return {
        ...state,
        tripInfo: {
          ...state.tripInfo,
          expenses: [
            ...(state.tripInfo.expenses || []),
            {
              ...expense,
              payer: expense.payer.id,
              users_to_split: expense.users_to_split?.map((_user) => _user.id),
            },
          ],
        },
      };
    }
  }
  return state;
};

export default tripsReducer;
