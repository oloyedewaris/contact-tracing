import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACKEND_URL } from './constants'

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    let token: any = await AsyncStorage.getItem('token');

    if (token)
      config.headers['x-auth-token'] = JSON.parse(token)

    console.log(config.headers['x-auth-token'])

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;