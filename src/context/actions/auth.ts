import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SET_USER,
  LOGOUT_USER,
  INITIALIZE_APP,
  UPDATE_PROFILE_IMAGE,
  UPDATE_USER
} from './types';

export const initializeApp = () => async (dispatch) => {
  let app: any = await AsyncStorage.getItem('app');
  app = JSON.parse(app)
  return dispatch({
    type: INITIALIZE_APP,
    payload: app
  })
}

export const setUser = (userData) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: userData
  })
}

export const updateUser = (locationData) => (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    payload: locationData,
  })
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