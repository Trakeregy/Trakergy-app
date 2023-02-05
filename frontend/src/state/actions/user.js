import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { USER_ACTION_TYPES } from '../types';

const updatePassword =
  ({ oldPassword, newPassword, confirmNewPassword }) =>
  async (dispatch) => {
    const res = await axios.patch(
      `${BASE_URL}/users/edit/password`,
      {
        oldPassword,
        newPassword,
        confirmNewPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_KEYS.AUTH_TOKEN
          )}`,
        },
      }
    );

    dispatch({
      type: USER_ACTION_TYPES.UPDATE_PASSWORD,
      payload: res.data,
    });
  };

const updateUserInfo =
  ({ firstName, lastName, email, username }) =>
  async (dispatch) => {
    const res = await axios.patch(
      `${BASE_URL}/users/edit/personal_info`,
      {
        firstName,
        lastName,
        email,
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_KEYS.AUTH_TOKEN
          )}`,
        },
      }
    );

    dispatch({
      type: USER_ACTION_TYPES.UPDATE_INFO,
      payload: res.data,
    });
  };

export { updatePassword, updateUserInfo };
