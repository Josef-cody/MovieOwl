import axios from 'axios';
import jwt_decode from "jwt-decode";

const axiosClient = axios.create({
   
    baseURL: 'https://movie-owl-fad4030d3883.herokuapp.com',
    headers: {
        'Content': "application/json",
        'Content-type': "application/json",
        'Accept': "application/json",
    },
});
axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Access_token');
        if (token) {
            const decoded = jwt_decode(token);
            const id = decoded.id
            config.headers.token = `Bearer ${token}`;
            config.params = {
                id:id
            };
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosClient;