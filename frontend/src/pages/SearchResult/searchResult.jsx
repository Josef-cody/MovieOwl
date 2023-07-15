import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from 'react-query'
import { searchMovie } from '../../hooks/movies'
import { useLocation,useNavigate } from 'react-router-dom'
import { CreateList, UpdateUserMovieList, getMovieList } from '../../hooks/myList'
import Navbar_user from '../../components/NavBar/Navbar'
import Footer from '../../components/Footer/footer'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function SearchResult() {
    let location = useLocation()
    let searchQuery = location.state
    const navigate = useNavigate()
    const { data: getMovies } = useQuery(['searchMovie', searchQuery], () => searchMovie(searchQuery));
    const { data: getList } = useQuery('getMovieList', getMovieList);
    const { mutate: createList } = CreateList();
    const { mutate } = UpdateUserMovieList();
    const checkList = (movie_id) => {
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
    const showMovie = (id) => {
        navigate(`/find/${id}`, { state: id })
    }
    return <>
        <Navbar_user />
        <Container>
            {getMovies?.data.map((getMovie, index) => {
                return <>
                    <Row className='list-movie-card me-4 mb-4 mt-5'>
                        <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                            <picture className="poster-container" onClick={()=> showMovie(getMovie?._id)}>
                                <img className="list-movie-poster" src={getMovie?.poster ? getMovie?.poster : './imgs/lost-poster.jpg'} alt='poster' />
                            </picture>
                        </Col>
                        <Col className="list-movie-card-body" xs={12} sm={12} md={9} lg={9} xl={9}>
                            <div className="list-movie-card-title" onClick={()=> showMovie(getMovie?._id)}>
                                <h4>{getMovie?.title}</h4>
                            </div>
                            <div>
                                <p className="list-movie-card-subtitle pb-3">
                                    {getMovie?.rated ? getMovie?.rated : <>UNRATED</>}
                                    / {getMovie?.year}
                                    / {getMovie?.genres?.map((genre, index) => {
                                        return <>{genre} </>
                                    })}
                                </p>
                                <div className="list-imdb">
                                    <p>IMDB: {getMovie?.imdb.rating}</p>
                                    <p className="ms-5">Votes: {getMovie?.imdb.votes}</p>
                                </div>
                                <div className="list-plot">
                                    <p>{getMovie?.plot}</p>
                                </div>
                            </div>
                            <div className="mt-3 mb-3 list-movie-card-footer">
                                <span type='button'><i className="fa-solid fa-film me-3"></i></span>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <span type='button' onClick={() => checkList(getMovie?._id)} ><i className="fa-solid fa-square-plus"></i></span>
                                </OverlayTrigger>
                                <span type='button' ><i className="fa-solid fa-share-nodes ms-3"></i></span>
                            </div>
                        </Col>
                    </Row>
                </>
            })}
        </Container>
        <Footer />
    </>
}
export default SearchResult