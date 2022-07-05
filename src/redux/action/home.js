import Axios from 'axios';
import {API_HOST} from '../../config';

export const getFoodData = () => dispatch => {
  Axios.get(`${API_HOST.url}/food`)
    .then(res => {
      dispatch({type: 'SET_FOOD', value: res.data.data.data});
    })
    .catch(err => {});
};

export const getFoodDataByTypes = types => dispatch => {
  Axios.get(`${API_HOST.url}/food?types=${types}`)
    .then(res => {
      if (types === 'new_food') {
        dispatch({type: 'SET_NEW_TASTE', value: res.data.data.data});
      } else if (types === 'popular') {
        dispatch({type: 'SET_POPULAR', value: res.data.data.data});
      } else if (types === 'recommended') {
        dispatch({type: 'SET_RECOMMENDED', value: res.data.data.data});
      }
    })
    .catch(err => {});
};
