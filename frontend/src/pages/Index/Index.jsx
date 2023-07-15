import React, { useState } from "react";
import { Row, Col, Container, Stack, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import Login from '../../components/AuthForm/Login/login'
import { useNavigate } from "react-router-dom";
import Register from "../../components/AuthForm/Register/register";
import FQ from './f&q'
import Section from './sections'
import Footer from '../../components/Footer/footer'
import Modal from "react-bootstrap/Modal";

function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState()
  const [showSignIn, setShowSignIn] = useState(false);
  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataOnSubmit) => {
    setEmail(dataOnSubmit)
  };
  return (
    <>
      <header>
        <nav >
          <Container className="navbar-index">
            <Stack direction="horizontal" gap={3}>
              <picture>
                <img
                  src="./imgs/Movie-owl.png"
                  alt="movie owl logo"
                  className="logo-img" />
              </picture>
              <div className="ms-auto">
                <div className='select-language'>
                  <select className="language">
                    <option value={''}><span>Language</span></option>
                    <option value={'svenska'}><span>Svenska</span></option>
                    <option value={'english'}><span>English</span></option>
                  </select>
                </div>
              </div>
              <div className="vr" />
              <div>
                <span
                  type='button'
                  className="cta-sign-in"
                  onClick={() => navigate('/secure')}>Sign in</span>
              </div>
            </Stack>
          </Container>
        </nav>
      </header>
      <main>
        <figure className="position-relative hero-container">
          <picture className="hero_img_container">
            <img src="./imgs/Movie-hero.png" className="hero_img" />
          </picture>
          <figcaption className="carousel-caption mb-5">
            <div className="hero_text">
              <h1>Unlimited films, TV programmes and more</h1>
              <h4>Watch anywhere. Cancel at any time.</h4>
              <p>Ready to watch? Enter your email to create or restart your membership.</p>
            </div>
          </figcaption>
        </figure>
        <Stack direction="horizontal" gap={3} className='cta-registe'>
          <form className='d-flex' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label></label>
              <input
                className="p-1 me-2"
                type="text"
                placeholder="E-mail address"
                name='email'
                {...register("email")}
              />
              <button
                type='submit'
                className="cta-sign-up"
                onClick={handleShowSignUp}
              >Sign up!</button>
            </div>
          </form>
        </Stack>
        <section>
          <Section />
        </section>
        <section>
          <Container className="hero_text">
            <FQ />
            <div className="pt-3">
              <h4>Ready to watch? Enter your email to create or restart your membership.</h4>
              <Stack direction="horizontal" gap={3} className='cta-registe-bottom pt-3 pb-5 border-bottom'>
                <form className='d-flex' onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label></label>
                    <input
                      className="p-1 me-2"
                      type="text"
                      placeholder="E-mail address"
                      name='email'
                      {...register("email")}
                    />
                    <button
                      type='submit'
                      className="cta-sign-up"
                      onClick={handleShowSignUp}
                    >Sign up!</button>
                  </div>
                </form>
              </Stack>
            </div>
          </Container>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
      <Modal show={showSignIn} onHide={handleCloseSignIn}>
        <Modal.Header>
          <h2>Sign In</h2>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header>
          <h2>Sign Up</h2>
        </Modal.Header>
        <Modal.Body>
          <Register props={email} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Index;
