import { QueryClient, useMutation } from 'react-query'
import axiosClient from './axiosInstance'

//get rendom movie
export const getRandomMovies = async ({pageParam = 1}) => {
 return await axiosClient.get(`/movie/random?_limit=30&_page=${pageParam}`).catch((e)=>console.log(e))
}

//get random movie by genre
export const getRandomMoviesByGenre = async (genre) => {
    return await axiosClient.get(`/movie/movie-random-genre/${genre}`).catch((e)=>console.log(e))
}
//get random movie by genre
export const getMovieByFilter = async (value) => {
    return await axiosClient.get(`/movie/getByFilter/${value}`).catch((e)=>console.log(e))
}

//get one movie by id
export const getOneMovie = async (id) => {
 return await axiosClient.get(`/movie/find/${id}`).catch((e)=>console.log(e))
}

//update movie
const UpdateOne = async ({id,data}) => {
    return await axiosClient.patch(`/movie/update/${id}`,data).catch((e)=>console.log(e))
}

export const UpdateOneMovie = () => {
    useMutation(UpdateOne);
}
//search movie
export const searchMovie = async (searchQuery) => {
    return await axiosClient.get(`/movie/search/${searchQuery}`).catch((e)=>console.log(e))
   }


