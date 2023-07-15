import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from 'react-query'
import { getOneMovie } from '../../hooks/movies'
import { DeleteMovieList, DeleteOneMovie } from '../../hooks/myList'
import { useNavigate } from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ListMovieCard(props) {
    const navigate = useNavigate()
    const movie_id = props?.props
    const { data: getMovie } = useQuery(['getOneMovie', movie_id], () => getOneMovie(movie_id));
    const id = getMovie?.data._id
    const { mutate: deleteList } = DeleteMovieList();
    const { mutate: deleteOneMovie } = DeleteOneMovie();
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete from My list
        </Tooltip>
    );
      const showMovie = (id) => {
        navigate(`/find/${id}`, { state: id })
    }
    return <>
        <Container>
            <Row className='list-movie-card me-4 mb-4'>
                <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                    <picture>
                        <img 
                        className="list-movie-poster" 
                        src={getMovie?.data.poster ? getMovie?.data.poster : './imgs/lost-poster.jpg'} 
                        alt='poster'
                        onClick={()=> showMovie(getMovie?.data._id)} />
                    </picture>
                </Col>
                <Col className="list-movie-card-body" xs={12} sm={12} md={9} lg={9} xl={9}>
                    <div className="list-movie-card-title" onClick={()=> showMovie(getMovie?.data._id)} >
                        <h4>{getMovie?.data.title}</h4>
                    </div>
                    <div>
                        <p className="list-movie-card-subtitle pb-3">
                            {getMovie?.data.rated ? getMovie?.data.rated : <>UNRATED</>}
                            / {getMovie?.data.year}
                            / {getMovie?.data.genres?.map((genre, index) => {
                                return <>{genre} </>
                            })}
                        </p>
                        <div className="list-imdb">
                            <p>IMDB: {getMovie?.data.imdb.rating}</p>
                            <p className="ms-5">Votes: {getMovie?.data.imdb.votes}</p>
                        </div>
                        <div className="list-plot">
                            <p>{getMovie?.data.plot}</p>
                        </div>

                    </div>
                    <div className="mt-3 mb-3 list-movie-card-footer">
                        <span type='button'><i className="fa-solid fa-film"></i></span>
                        <span type='button' ><i className="fa-solid fa-share-nodes ms-5"></i></span>

                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <span type='button' onClick={()=> deleteOneMovie(id)}><i className="fa-solid fa-trash ms-5"></i></span>
                        </OverlayTrigger>
                    </div>

                </Col>
            </Row>
        </Container>
    </>
}
export default ListMovieCard