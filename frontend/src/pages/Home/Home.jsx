import React from "react";
import Navbar_user from '../../components/NavBar/Navbar'
import Header from '../../components/Header/Header'
import { MovieRandom, MovieRandomByGenre, GetMovieByFilter } from '../../components/Row/rowMovies'
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import Footer from '../../components/Footer/footer'
import { genre, languages, year, countries } from '../../data_base/genre'
function Home() {
    const [filterYear, setFilterYear] = React.useState();
    const [filterLanguages, setFilterLanguages] = React.useState();
    const [filterCountries, setFilterCountries] = React.useState();
    const filter = Object.assign({},
        filterYear,
        filterLanguages,
        filterCountries
    );
    const renderFilterMovie = () => {
        if (filterYear == undefined && 
            filterLanguages == undefined &&
            filterCountries == undefined) {
            return <></>
        } else {
            return <>
                <Container className='section-bottom mt-4'>
                    <Row className="g-2 card-scroll">
                        <GetMovieByFilter props={filter} />
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
                        <li className="text-light" onClick={() => setFilterYear({year})}>{year}</li>
                    </ul>
                </>
            })}
            <div className="text-light mb-3">Languages:</div>
            {languages?.map((languages, index) => {
                return <>
                    <ul className="text-light filter-list">
                        <li className="text-light" onClick={() => setFilterLanguages({ languages })}>{languages}</li>
                    </ul>
                </>
            })}
            <div className="text-light mb-3">Countries:</div>
            {countries?.map((countries, index) => {
                return <>
                    <ul key={index} className="text-light filter-list">
                        <li className="text-light" onClick={() => setFilterCountries({ countries })}>{countries}</li>
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