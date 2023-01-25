import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { AUTH_ACTION_TYPES } from '../types';

const signUp = (newUser) => async (dispatch) => {
    const { password, ...user } = newUser;
    const oldUser = { ...user, password1: password, password2: password };
    await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        body: JSON.stringify(oldUser),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const logIn = (newUser) => async (dispatch) => {
    const res = await axios.post(`${BASE_URL}/users/login`, newUser);
    const payload = res.data;
    if (payload?.access) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, payload.access);
        const userResponse = await axios.get(
            `${BASE_URL}/users/view/current_user`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        LOCAL_STORAGE_KEYS.AUTH_TOKEN
                    )}`,
                },
            }
        );

        dispatch({
            type: AUTH_ACTION_TYPES.LOG_IN,
            payload: userResponse.data,
        });
    }
};

const logOut = () => async (dispatch) => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    await fetch(`${BASE_URL}/users/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

    dispatch({
        type: AUTH_ACTION_TYPES.LOG_OUT,
    });
};

export { logIn, signUp, logOut };
