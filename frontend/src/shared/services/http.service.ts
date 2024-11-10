import axios, { AxiosError, AxiosResponse } from "axios";

const _axios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,

})

_axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        Promise.reject(error);
    }
);

_axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error),
);

export default _axios