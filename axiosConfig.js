if (__DEV__) {
  require('./ReactotronConfig');
}
import Constants from "expo-constants";

console.tron.log(Constants.expoConfig.extra.API_URL);
console.tron.log('aki')
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.baseURL = Constants.expoConfig.extra.API_URL;
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
