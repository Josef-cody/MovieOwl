import React, { useState } from "react";
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { CreateList, UpdateUserMovieList, getMovieList } from '../../hooks/myList'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function MovieCard(props) {
    const navigate = useNavigate()
    const { data: getList } = useQuery('getMovieList', getMovieList);
    const { mutate: createList } = CreateList();
    const { mutate } = UpdateUserMovieList();
    const checkList = () => {
        console.log(getList)
        if (getList?.data === null) {
            createList(props?.props._id)
        } else {
            mutate(props?.props._id)
        }
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Add to My list
        </Tooltip>
    );
    const showMovie = (id) => {
        navigate(`/find/${id}`, { state: id })
    }
    return <>
        <div className='movie-card me-4 mb-4'>
            <picture>
                <img 
                className="movie-poster" 
                src={props?.props.poster ? props?.props.poster : './imgs/lost-poster.jpg'} 
                alt='poster'
                onClick={()=> showMovie(props?.props._id)}
                 />
            </picture>
            <div className="movie-card-body">
                <div type='button' className="movie-card-title" onClick={()=> showMovie(props?.props._id)}>
                    <h4>{props?.props.title.slice(0, 25)}</h4>
                </div>
                <div>
                    <p className="movie-card-subtitle pb-3">
                        {props?.props.rated ? props?.props.rated : <>UNRATED</>}
                        / {props?.props.year}
                        / {props?.props.genres?.map((genre, index) => {
                            return <>{genre} </>
                        })}
                    </p>
                    <div className="imdb">
                        <p>IMDB: {props?.props.imdb.rating}</p>
                        <p>Votes: {props?.props.imdb.votes}</p>
                    </div>
                    <div className="plot">
                        <p>{props?.props.plot}</p>
                    </div>

                </div>
                <div className="mt-3 mb-3 movie-card-footer">
                    <span type='button'><i className="fa-solid fa-film"></i></span>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <span type='button' ><i className="fa-solid fa-square-plus" onClick={()=>checkList()}></i></span>
                    </OverlayTrigger>
                    <span type='button' ><i class="fa-solid fa-share-nodes"></i></span>
                </div>

            </div>
        </div>
    </>
}
export default MovieCard