import { AUTH_ACTION_TYPES } from '../types';

export const AuthState = {
    authenticated: false,
    currentUser: undefined,
};

const authReducer = (state = AuthState, action) => {
    if (action.type === AUTH_ACTION_TYPES.LOG_IN) {
        return {
            ...state,
            authenticated: true,
            currentUser: action.payload,
        };
    } else if (action.type === AUTH_ACTION_TYPES.LOG_OUT) {
        return {
            authenticated: false,
            currentUser: undefined,
        };
    }
    return state;
};

export default authReducer;
