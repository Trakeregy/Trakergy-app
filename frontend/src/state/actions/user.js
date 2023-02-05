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
  ({ firstName, lastName, email, username, imageUrl }) =>
  async (dispatch) => {
    const res = await axios.patch(
      `${BASE_URL}/users/edit/personal_info`,
      {
        firstName,
        lastName,
        email,
        username,
        imageUrl,
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

const uploadProfileImage = (image) => async (dispatch) => {
  if (!image) return;

  const formData = new FormData();
  formData.append('image', image);

  const res = await axios.post(
    `${BASE_URL}/users/upload_profile_image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEYS.AUTH_TOKEN
        )}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  dispatch({
    type: USER_ACTION_TYPES.UPLOAD_IMAGE,
    payload: res.data,
  });
};

export { updatePassword, updateUserInfo, uploadProfileImage };
