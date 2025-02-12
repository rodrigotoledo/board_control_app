import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'https://6671-45-71-76-107.ngrok-free.app/api';
axios.defaults.headers = {
  'Content-Type': 'application/json',
};

axios.interceptors.request.use(
  async config => {
    const authToken = await AsyncStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    console.log('Error interceptors:', error);
    return Promise.reject(error);
  },
);

export default axios;
