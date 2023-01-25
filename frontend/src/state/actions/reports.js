import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { PERSONAL_REPORTS_ACTION_TYPES } from '../types';

const getPersonalSumByType = (year) => async (dispatch) => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

    const res = await axios.get(
        `${BASE_URL}/reports/personal/sum_by_type?year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }
    );

    const payload = res.data;

    dispatch({
        type: PERSONAL_REPORTS_ACTION_TYPES.SUM_BY_TYPE,
        payload,
    });
};

export { getPersonalSumByType };
