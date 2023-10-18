import axios from 'axios';
import { toast } from 'react-toastify';

export const AxiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export function configureAxios(incrementRequestCount, decrementRequestCount) {

    AxiosInstance.interceptors.request.use(
        (config) => {
            incrementRequestCount()
            return config;
        },
        (error) => {
            decrementRequestCount();
            return Promise.reject(error);
        }
    );

    AxiosInstance.interceptors.response.use(
        (response) => {
            decrementRequestCount();
            return response;
        },
        (error) => {
            decrementRequestCount();
            toast(error.response.data ?? error.message);
            return Promise.reject(error);
        }
    );
};
