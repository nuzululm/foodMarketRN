import Axios from 'axios';
import {API_HOST, STORAGE_HOST} from '../../config';
import {showMessage} from '../../utils';
import {storeData} from '../../utils/storage';
import {setLoading} from './global';

//second arrow dispatch digunakan agar dispatch dapat berfungsi
// di dalam async
export const signUpAction =
  (dataRegister, photoReducer, navigation) => dispatch => {
    Axios.post(`${API_HOST.url}/register`, dataRegister)
      .then(res => {
        const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
        const profile = res.data.data.user;

        //simpan data token ke local
        storeData('token', {value: token});

        //Upload Photo
        if (photoReducer.isUploadPhoto) {
          //ambil data photo dari store dan simpan ke FormData
          const photoForUpload = new FormData();
          photoForUpload.append('file', photoReducer);

          Axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data, headers) => {
              return data;
            },
          })
            .then(resUpload => {
              profile.profile_photo_url = `${STORAGE_HOST.url}/${resUpload.data.data[0]}`;
              storeData('userProfile', profile);
              navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            })
            .catch(err => {
              showMessage('Upload photo tidak berhasil');
              storeData('userProfile', profile);
              navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            });
        } else {
          //simpan data token ke local
          storeData('userProfile', profile);
          navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
        }

        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.message);
      });
  };

export const signInAction = (form, navigation) => dispatch => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/login`, form)
    .then(res => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;

      dispatch(setLoading(false));
      storeData('token', {value: token});
      storeData('userProfile', profile);
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch(err => {
      dispatch(setLoading(false));
      console.log('error : ', err);
      showMessage(err?.response?.data?.message);
    });
};
