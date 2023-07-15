import { useMutation } from 'react-query';
import axiosClient from '../hooks/axiosInstance';
import { toast } from "react-toastify";

export const getOneUser = async () => {
    return await axiosClient.get('/user/find').catch(e => console.log(e))
}
const UpdateOneUser = async (data) => {
    return await axiosClient.patch('/user/update',data).then((res) => {
        toast(res.data.msg);
    }).catch((err) => console.log(err));
}

export const UpdateUser = () => {
   return useMutation(UpdateOneUser)
}