import axios from 'axios';
import jwt_decode from "jwt-decode";

const axiosClient = axios.create({
    // http://localhost:8080
    //https://movie-owl-fad4030d3883.herokuapp.com
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
            const userId = decoded.id
            const username = decoded.name
            config.headers.token = `Bearer ${token}`;
            config.params = {
                userId:userId,
                username:username
            };
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosClient;