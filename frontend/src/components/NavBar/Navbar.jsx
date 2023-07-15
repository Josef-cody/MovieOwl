import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from 'react-query';
import { getOneUser } from '../../hooks/user';
import { useForm } from "react-hook-form";
import UserUpdate from '../AuthForm/UserUpdate/userUpdate'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import { DeleteMovieList } from '../../hooks/myList'

function Navbar_user() {
  const navigate = useNavigate();
  const { data: user } = useQuery('getOneUser', () => getOneUser())
  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.clear();
    navigate("/");
    queryClient.clear();
  };
  const [show, setShow] = React.useState(false);
  const [smShow, setSmShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const searchQuery = data.searchQuery
    navigate(`/search-result/${searchQuery}`, { state: searchQuery })
  };
  const { mutate: DeleteList } = DeleteMovieList();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="navbar-home">
          <Navbar.Brand href="/home">
            <picture>
              <img
                src="/imgs/Movie-owl.png"
                alt="movie owl logo"
                className="logo-img" />
            </picture>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='text-light' href="/home">Movies</Nav.Link>
              <Nav.Link className='text-light' href="#">Serial</Nav.Link>
              <Nav.Link className='text-light' href="#recommend">New & Popular</Nav.Link>
              <Nav.Link className='text-light' href="/mylist">My list</Nav.Link>
              <Nav.Link className='text-light' href="#Family">Children</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav className='nav-top-right'>
            <Nav.Link onClick={() => setSmShow(true)}><i className="fa-solid fa-magnifying-glass text-light"></i></Nav.Link>
            <Nav.Link href="#deets"><i className="fa-regular fa-bell text-light"></i></Nav.Link>
            <Nav.Link onClick={handleShow}>
              <picture ><img src={user?.data.profilePic} alt='user avatar' className='user-avatar' /></picture>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement='end'
        name='end'
      >
        <Offcanvas.Header className='section'>
          <h6>Logout</h6><i className="fa-solid fa-right-from-bracket me-1" onClick={() => logout()}></i>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserUpdate props={user?.data} />
          <button className="cta-sign-in w-75 m-auto" onClick={()=>DeleteList()}>Delete my movie list</button>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="search-container">
            <input
              placeholder="Search for movie"
              aria-label="Search for movie"
              aria-describedby="basic-addon2"
              name='searchQuery'
              className='searchBar'
              {...register("searchQuery", { required: true, maxLength: 50 })}
            />
            <button className='searchBar-button' type='submit'>Search</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navbar_user;