import { useQueryClient, useMutation } from 'react-query'
import axiosClient from './axiosInstance'
import { toast } from "react-toastify";

//Create a movie list
const createNewList = async (movie_id) => {
    return await axiosClient.post(`list/create/${movie_id}`).then((res) => {
        toast(res.data.msg);
    }).catch((e) => console.log(e))
}
export const CreateList = () => {
    const queryClient = useQueryClient();
    return useMutation(createNewList, {
        onSuccess: (data) => {
          queryClient.invalidateQueries("getMovieList");
          queryClient.setQueriesData("getMovieList", (oldQueryData) => {
            return {
              ...oldQueryData,
              data: [...oldQueryData.data, data.data],
            };
          });
        },
      });
};
//get movie list
export const getMovieList = async () => {
    return await axiosClient.get('list/find').catch((e) => console.log(e))
}

//update movie list
const UpdateOneList = async (movie_id) => {
    return await axiosClient.patch(`list/updatelist/${movie_id}`).then((res) => {
        toast(res.data.msg);
    }).catch((e) => console.log(e))
}
export const UpdateUserMovieList = () => {
    return useMutation(UpdateOneList);
}

//Delete one movie from list
const DeleteOne = async (id) => {
    return await axiosClient
        .delete(`list/deleteOneMovie/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOneMovie = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries('getMovieList')
        }
    })
}
//Delete list
const DeleteList = async () => {
    return await axiosClient
        .delete(`list/delete`)
        .then(res=>toast(res.data.msg))
        .catch((err) => console.log(err));
};
export const DeleteMovieList = () => {
    return useMutation(DeleteList)
}



