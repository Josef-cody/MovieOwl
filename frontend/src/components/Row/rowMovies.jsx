import React, { Fragment } from "react";
import { useInfiniteQuery, useQuery } from 'react-query'
import { getRandomMovies, getRandomMoviesByGenre,getMovieByFilter } from '../../hooks/movies'
import MovieCard from '../MovieCard/MovieCard'
import ListMovieCard from "../MovieCard/listMovieCard";
//get rendom movie
export const MovieRandom = () => {
    const { 
        data: movieRadom, 
        isLoading, 
        error, 
        hasNextPage, 
        fetchNextPage, 
        isFetching, 
        isFetchingNextPage } = useInfiniteQuery('getRandomMovies',
        getRandomMovies,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 5) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            },
            refetchOnWindowFocus: false,
        }
        )
    if (isLoading) {
        return <>
            <div className="movie-card"></div>
        </>
    }
    if (error) {
        return <>
            <h4>Something went wrong</h4>
        </>
    }

    return <>
        {movieRadom?.pages.map((group, index) => {
            return <Fragment key={index}>
                {
                    group?.data.map((item)=>{
                    return <MovieCard props={item} />
                })
                }
            </Fragment>
        })}
        <div className="page-button-container"><i className="fa-solid fa-forward-step next-page-button" disabled={!hasNextPage} onClick={fetchNextPage}></i></div>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
}

// get random movie by genre
export const MovieRandomByGenre = (props) => {
    const genre = props.props
    const { data: movieRadomByGenre, 
        isLoading, 
        error, 
        hasNextPage, 
        fetchNextPage, 
        isFetching, 
        isFetchingNextPage } = useInfiniteQuery(
        ['getRandomMoviesByGenre', genre],
        () => getRandomMoviesByGenre(genre),
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 6) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            },
            refetchOnWindowFocus: false,
        })

    if (isLoading) {
        return <>
            <div className="movie-card"></div>
        </>
    }
    if (error) {
        return <>
            <h4>Something went wrong</h4>
        </>
    }

    return <>
        {movieRadomByGenre?.pages.map((group, index) => {
            return <Fragment key={index}>
                {
                    group?.data.map((item)=>{
                    return <MovieCard props={item} />
                })
                }
            </Fragment>
        })}
        <div className="page-button-container"><i className="fa-solid fa-forward-step next-page-button" disabled={!hasNextPage} onClick={fetchNextPage}></i></div>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
}

// get random movie by filter
export const GetMovieByFilter = (props) => {
    const filterQuery = props.props
    const { data: movieByFilter, 
        isLoading, 
        error, 
        hasNextPage, 
        fetchNextPage,
        isFetching, 
        isFetchingNextPage } = useInfiniteQuery(
            ['getMovieByFilter', filterQuery],
            () => getMovieByFilter(filterQuery),
            {
                getNextPageParam: (_lastPage, pages) => {
                    if (pages.length < 6) {
                        return pages.length + 1
                    } else {
                        return undefined
                    }
                },
                refetchOnWindowFocus: false,
            })

    if (isLoading) {
        return <>
            <div className="movie-card"></div>
        </>
    }
    if (error) {
        return <>
            <h4>Something went wrong</h4>
        </>
    }

    return <>
        {movieByFilter?.pages.map((group, index) => {
            return <Fragment key={index}>
                {
                    group?.data.map((item)=>{
                    return <MovieCard props={item} />
                })
                }
            </Fragment>
        })}
        <div className="page-button-container"><i className="fa-solid fa-forward-step next-page-button" disabled={!hasNextPage} onClick={fetchNextPage}></i></div>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
}
//render mylist movies
export const MyListRow = () => {
    return <>
        <ListMovieCard />
    </>
}


