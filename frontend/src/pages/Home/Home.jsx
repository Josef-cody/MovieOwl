import React from "react";
import Navbar_user from '../../components/NavBar/Navbar'
import Header from '../../components/Header/Header'
import { MovieRandom, MovieRandomByGenre } from '../../components/Row/rowMovies'
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import Footer from '../../components/Footer/footer'
import { genre } from '../../data_base/genre'
import {Filter} from "../../components/Filter/filter";
function Home() {

    return <>
        <Navbar_user />
        <Header />
        <Filter />
        <Container className='section-bottom'>
            <h5 className="text-light pb-3 mt-5" id="recommend">Recommend movies</h5>
            <Row className="g-2 card-scroll">
                <MovieRandom />
            </Row>
        </Container>
        <Container className='section-bottom'>
            {genre.sort().map((genre, index) => {
                return <>
                    <h5 className="text-light pb-3 mt-5">{genre}</h5>
                    <Row className="g-2 card-scroll" key={index} id={genre}>
                        <MovieRandomByGenre props={genre} />
                    </Row>
                </>
            })}
        </Container>
        <Footer />
    </>
}
export default Home;