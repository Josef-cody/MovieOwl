import React from "react";
import { Row, Col, Container, Stack, Form } from 'react-bootstrap'

export default function Section() {
    const section = [
        {
            title: 'Enjoy on your TV',
            desc: 'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.',
            img: "./imgs/tv.gif"
        },
        {
            title: 'Download your programmes to watch offline',
            desc: 'Save your favourites easily and always have something to watch.',
            img: "./imgs/mobile-strangthings.jpeg"
        },
        {
            title: 'Watch everywhere',
            desc: 'Stream unlimited films and TV programmes on your phone, tablet, laptop and TV.',
            img: "./imgs/device-pile.png"
        },
        {
            title: 'Create profiles for children',
            desc: 'Send children on adventures with their favourite characters in a space made just for them – free with your membership.',
            img: "./imgs/children.png"
        }
    ]

    return <>
        {section.map((item, index) => {
            if (index % 2 === 0) {
                return <>
                    <Container key={index}>
                        <Row className="section mb-5 p-5">
                            <Col className="hero_text" lg={6} md={6} sm={12} xs={12}>
                                <h1>
                                    {item.title}
                                </h1>
                                <h4>
                                    {item.desc}
                                </h4>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <picture>
                                    <img src={item.img} />
                                </picture>
                            </Col>
                        </Row>
                    </Container>
                </>
            } else {
                return <>
                    <Container key={index}>
                        <Row className="section mb-5 p-5">
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <picture>
                                    <img src={item.img} />
                                </picture>
                            </Col>
                            <Col className="hero_text" lg={6} md={6} sm={12} xs={12}>
                                <h1>
                                    {item.title}
                                </h1>
                                <h4>
                                    {item.desc}
                                </h4>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        })}
    </>
}