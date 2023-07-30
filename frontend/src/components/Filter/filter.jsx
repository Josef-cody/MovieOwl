import React from "react";
import { GetMovieByFilter } from '../Row/rowMovies'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import { useForm } from "react-hook-form";

import { genre, languages, year, countries } from '../../data_base/genre'

export const Filter = () => {
    const [filter, setFilter] = React.useState();
    const renderFilterMovie = () => {
        if (filter === undefined) { return <></> }
        else {
            Object.keys(filter).forEach(key => {
                if (!filter[key])
                    delete filter[key]
            });
            return <>
                <Container className='section-bottom mt-4'>
                    <Row className="g-2 card-scroll">
                        <GetMovieByFilter props={filter} />
                    </Row>
                </Container>
            </>
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setFilter(data);
    };

    return <>
        <Container className='mt-5 mb-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col><label htmlFor="year" className="text-light">Year</label>
                        <select {...register("year")} className="form-select">
                            <option selected disabled></option>
                            {year?.map((year, index) => {
                                return <option >{year}</option>
                            })}
                        </select></Col>
                    <Col><label htmlFor="countries" className="text-light">Countries</label>
                        <select name="countries" {...register("countries")} className="form-select">
                            <option></option>
                            {countries?.map((countries, index) => {
                                return <option>{countries}</option>
                            })}
                        </select></Col>
                    <Col><label htmlFor="languages" className="text-light">Language</label>
                        <select name="languages" {...register("languages")} className="form-select">
                            <option></option>
                            {languages?.map((language, index) => {
                                return <option>{language}</option>
                            })}
                        </select></Col>
                    <Col><label htmlFor="genre" className="text-light">Genre</label>
                        <select name="genres" {...register("genres")} className="form-select">
                            <option></option>
                            {genre?.map((genre, index) => {
                                return <option>{genre}</option>
                            })}
                        </select></Col>
                    <Col><button type="submit" className="searchBar-button w-100 mt-4">Apply</button></Col>
                </Row>
            </form>
        </Container>
        {renderFilterMovie()}
    </>
}