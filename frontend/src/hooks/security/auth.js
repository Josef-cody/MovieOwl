import { useMutation } from 'react-query';
import axiosClient from '../axiosInstance';

const postUserData = async (data) => {
    const res = await axiosClient.post('/login', data).then(res => {
        return {
            Access_token: res.data.accessToken,
            username: res.data.username,
            email:res.data.email,
            user:res.data,
            profilePic:res.data.profilePic,
            msg: res.data.msg
        }
    });
    return res;
}

export const useUserLogin = () => {
    return useMutation(postUserData);
}

const postRegisteData = async (data) => {
    const res = await axiosClient.post('/register', data).then(res => {
        return {
            msg:'Successfully registed'
        }
    });
    return res;
}

export const useRegister = () => {
    return useMutation(postRegisteData);
}


