import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../utils/axiosInstance';
import {
  NETWORK_LOADING,
  NETWORK_ERROR,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  INITIALIZE_APP,
  UPDATE_PROFILE_IMAGE,
  UPDATE_USER
} from './types';

export const initializeApp = () => async (dispatch) => {
  dispatch({
    type: NETWORK_ERROR,
    payload: null
  })
  let app: any = await AsyncStorage.getItem('app');
  app = JSON.parse(app)
  return dispatch({
    type: INITIALIZE_APP,
    payload: app
  })
}

export const registerUser = (userData) => (dispatch) => {
  dispatch({ type: NETWORK_LOADING })
  axios.post('/user/register', userData)
    .then(res => {
      return dispatch({
        type: REGISTER_USER,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: NETWORK_ERROR,
        payload: err.response?.data?.msg || 'Something went wrong, try again'
      })
    })
}

export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: NETWORK_LOADING })
  axios.post('/user/login', userData)
    .then(res => {
      console.log(res.data)
      return dispatch({
        type: LOGIN_USER,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: NETWORK_ERROR,
        payload: err.response?.data?.msg || 'Something went wrong, try again'
      })
    })
}

export const updateUser = (locationData) => (dispatch) => {
  axios.patch('/user/update', { locationData })
    .then(res => {
      return dispatch({
        type: UPDATE_USER,
        payload: res.data,
      })
    })
    .catch(err => console.log('update location error', err.response?.data))
}

export const logoutUser = () => (dispatch) => {
  return dispatch({
    type: LOGOUT_USER,
  })
}

export const updateProfileImage = (image) => (dispatch) => {
  return dispatch({
    type: UPDATE_PROFILE_IMAGE,
    payload: image
  })
}