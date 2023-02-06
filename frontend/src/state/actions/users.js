import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';

const getAllUsers = () => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  
    return axios
      .get(`${BASE_URL}/users`, {
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
  }
      
export {
    getAllUsers
}