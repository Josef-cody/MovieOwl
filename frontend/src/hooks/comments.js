import { QueryClient, useMutation } from 'react-query'
import axiosClient from './axiosInstance'
import {toast} from 'react-toastify'
//create comment
const createComment = async ({movie_id,data}) => {
   return await axiosClient.post(`/comment/create/${movie_id}`,data).then((res) => {
    toast(res.data.msg);
}).catch((e)=>console.log(e))
}
export const CreateNewComment = () => {
    return useMutation(createComment)
}
//get commet
export const getMovieComment = async (movie_id) => {
    return await axiosClient.get(`/comment/movie/${movie_id}`).catch((e)=>console.log(e))
}

//get comment
export const getUsersComment = async (comment_id) => {
 return await axiosClient.get(`/comment/user_comment/${comment_id}`).catch((e)=>console.log(e))
}

//update comment
const UpdateOne = async ({comment_id,updateStats}) => {
    
    return await axiosClient.patch(`/comment/update/${comment_id}`,updateStats).then((res) => {
        toast(res.data.msg);
    }).catch((e)=>console.log(e))
}

export const UpdateOneComment = () => {
   return useMutation(UpdateOne);
}

//delete comment
const deleteComent = async (comment_id) => {
    let commentId = comment_id.comment_id
    return await axiosClient.delete(`/comment/delete/${commentId}`).then((res) => {
        toast(res.data.msg);
    }).catch((e)=>console.log(e))
   }
export const DeleteOneComment = () => {
   return useMutation(deleteComent);
}
