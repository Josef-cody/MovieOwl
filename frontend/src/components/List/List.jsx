import React from "react";
import Navbar_user from '../../components/NavBar/Navbar'
import Header from '../Header/Header'
import { getMovieList } from '../../hooks/myList'
import { useQuery } from 'react-query';
import ListMovieCard from "../MovieCard/listMovieCard";
import Footer from '../../components/Footer/footer'
import { genre }from '../../data_base/genre'
import { Container } from "react-bootstrap";

function MyList() {
    const { data: getList } = useQuery('getMovieList', getMovieList);

   const listDetector = () => {if (getList?.data === null || getList?.data.content.length === 0) { return <h3 className="text-light m-5 p-5">Your list is empty</h3> }}
    return <>
        <Navbar_user />
        <Container className="section mt-5">
        {listDetector()}
            {getList?.data?.content.map((movie_id, index) => {
                return <>
                    <ListMovieCard props={movie_id} key={index} />
                </>
            })}
        </Container>
        <Footer />
    </>
}
export default MyList;