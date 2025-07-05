import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://apis.dentalkart.com/',
    headers: {
        'x-api-key': 'ZFobrRyccnTyXyXHPUVO4eyyKEKoSjWB',
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;