import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from 'react-query'
import { getOneMovie } from '../../hooks/movies'
import { useLocation } from 'react-router-dom'
import { CreateList, UpdateUserMovieList, getMovieList } from '../../hooks/myList'
import Navbar_user from '../../components/NavBar/Navbar'
import Footer from '../../components/Footer/footer'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function MovieDetail() {
    let location = useLocation()
    let movie_id = location.state
    const { data: getMovie } = useQuery(['getOneMovie', movie_id], () => getOneMovie(movie_id));
    const { data: getList } = useQuery('getMovieList', getMovieList);
    const { mutate: createList } = CreateList();
    const { mutate } = UpdateUserMovieList();
    const checkList = () => {
        if (getList.data === null) {
            createList(movie_id)
        } else {
            mutate(movie_id)
        }
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Add to My list
        </Tooltip>
    );

    return <>
        <Navbar_user />
        <Container>
            <Row className='movie-detail me-4 mb-4 mt-5'>
                <picture className="poster-container">
                    <img className="movie-detail-poster w-100" src={getMovie?.data.poster ? getMovie?.data.poster : './imgs/lost-poster.jpg'} alt='poster' />
                </picture>

                <Col className="movie-detail-body mt-5" xs={10} sm={10} md={10} lg={10} xl={10}>
                    <div className="list-movie-card-title">
                        <h4>{getMovie?.data.title.slice(0, 25)}</h4>
                    </div>
                    <div>
                        <Row className="movie-detail-subtitle pb-1">
                            <Col>
                                <p>
                                    {getMovie?.data.rated ? getMovie?.data.rated : <>UNRATED</>}
                                    / {getMovie?.data.year}
                                    / {getMovie?.data.genres?.map((genre, index) => {
                                        return <>{genre} </>
                                    })}
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    Countries: {getMovie?.data.countries?.map((countrie, index) => {
                                        return <>{countrie} </>
                                    })}
                                </p>
                                <p>
                                    Directors: {getMovie?.data.directors?.map((director, index) => {
                                        return <>{director} </>
                                    })}
                                </p>
                                <p>
                                    Writers: {getMovie?.data.writers?.map((writer, index) => {
                                        return <>{writer} </>
                                    })}
                                </p>
                            </Col>
                        </Row>

                        <div className="list-imdb mt-3">
                            <p>IMDB: {getMovie?.data.imdb.rating}</p>
                            <p className="ms-5">Votes: {getMovie?.data.imdb.votes}</p>
                        </div>
                        <div className="movie-detail-plot">
                            <p>{getMovie?.data.fullplot}</p>
                        </div>

                    </div>
                    <div className="mt-3 mb-3 movie-card-footer">
                        <span type='button'><i className="fa-solid fa-film"></i></span>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <span type='button' onClick={() => checkList()} ><i className="fa-solid fa-square-plus"></i></span>
                        </OverlayTrigger>
                        <span type='button' ><i class="fa-solid fa-share-nodes"></i></span>
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer />
    </>
}
export default MovieDetail