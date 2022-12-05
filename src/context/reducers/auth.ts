import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SET_USER,
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
    case SET_USER:
      app = {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }
      AsyncStorage.setItem('app', JSON.stringify(app))
      AsyncStorage.setItem('token', JSON.stringify(action.payload.token))
      console.log()
      return app
    case UPDATE_USER:
      app = {
        ...state,
        user: action.payload.user,
      }
      AsyncStorage.setItem('app', JSON.stringify(app))
      return app
    case LOGOUT_USER:
      app = {
        ...state,
        isAuthenticated: false,
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