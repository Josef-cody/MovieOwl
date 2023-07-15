import React from "react";
import Navbar_user from '../../components/NavBar/Navbar'
import Header from '../../components/Header/Header'
import { MovieRandom, MovieRandomByGenre, GetMovieByFilter } from '../../components/Row/rowMovies'
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import Footer from '../../components/Footer/footer'
import { genre, languages, year } from '../../data_base/genre'
function Home() {
    const [value, setValue] = React.useState();
    const renderFilterMovie = () => {
        if (!value) {
            return <></>
        } else {
            const filterValue = Object.values(value);
            return <>
                <Container className='section-bottom mt-4'>
                    <Row className="g-2 card-scroll">
                        <GetMovieByFilter props={filterValue} />
                    </Row>
                </Container>
            </>
        }
    }
    return <>
        <Navbar_user />
        <Header />
        <Container className='section-bottom list-container mt-5'>
            <div className="text-light mb-3">Year:</div>
            {year?.map((year, index) => {
                return <>
                    <ul className="text-light filter-list">
                        <li className="text-light" onClick={() => setValue({ year })}>{year}</li>
                    </ul>
                </>
            })}
            <div className="text-light mb-3">Languages:</div>
            {languages?.map((languages, index) => {
                return <>
                    <ul className="text-light filter-list">
                        <li className="text-light" onClick={() => setValue({ languages })}>{languages}</li>
                    </ul>
                </>
            })}
        </Container>
        {renderFilterMovie()}
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