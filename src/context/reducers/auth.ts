import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_USER,
  REGISTER_USER,
  NETWORK_LOADING,
  NETWORK_ERROR,
  LOGOUT_USER,
  INITIALIZE_APP,
  UPDATE_USER,
  UPDATE_PROFILE_IMAGE
} from '../actions/types';

const auth = (state, action) => {
  let app;
  switch (action.type) {
    case INITIALIZE_APP:
      app = {
        ...state,
        ...action.payload,
        appLoaded: true
      }
      return app
    case REGISTER_USER:
    case LOGIN_USER:
      app = {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        networkLoading: false,
        networkError: null,
      }
      AsyncStorage.setItem('app', JSON.stringify(app))
      AsyncStorage.setItem('token', JSON.stringify(action.payload.token))
      console.log()
      return app
    case UPDATE_USER:
      app = {
        ...state,
        user: action.payload.user,
        networkLoading: false,
        networkError: null,
      }
      AsyncStorage.setItem('app', JSON.stringify(app))
      return app
    case NETWORK_LOADING:
      return {
        ...state,
        networkLoading: true,
        networkError: null,
      }
    case NETWORK_ERROR:
      return {
        ...state,
        networkLoading: false,
        networkError: action.payload
      }
    case LOGOUT_USER:
      app = {
        ...state,
        isAuthenticated: false,
        networkLoading: false,
        networkError: null,
        user: null,
        userProfileImage: null
      }
      AsyncStorage.setItem('app', JSON.stringify(app))
      AsyncStorage.removeItem('token')
      return app
    case UPDATE_PROFILE_IMAGE:
      app = {
        ...state,
        userProfileImage: action.payload
      }
      AsyncStorage.setItem('app', JSON.stringify(app))
      return app
    default:
      return state
  }
}

export default auth