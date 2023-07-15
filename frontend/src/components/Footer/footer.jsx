import React from "react";
import { Row, Col, Container, Stack, Form } from 'react-bootstrap'

function Footer() {
    return <>
        <Container className="mt-5 mb-5 ">
            <Row>
                <Col xlg={3} lg={3} md={3} sm={6} xs={6}>
                    <h6><a href="#">FAQ</a></h6>
                    <h6><a href="#">Media Centre</a></h6>
                    <h6><a href="#">Redeem gift cards</a></h6>
                    <h6><a href="#">Terms of Use</a></h6>
                </Col>
                <Col xlg={3} lg={3} md={3} sm={6} xs={6}>
                    <h6><a href="#">Help Centre</a></h6>
                    <h6><a href="#">Investor Relations</a></h6>
                    <h6><a href="#">Buy gift cards</a></h6>
                    <h6><a href="#">Privacy</a></h6>
                </Col>
                <Col xlg={3} lg={3} md={3} sm={6} xs={6}>
                    <h6><a href="#">Account</a></h6>
                    <h6><a href="#">Jobs</a></h6>
                    <h6><a href="#">Ways to Watch</a></h6>
                    <h6><a href="#">Cookie Preferences</a></h6>
                </Col>
                <Col xlg={3} lg={3} md={3} sm={6} xs={6}>
                    <h6><a href="">Legal Guarantee</a></h6>
                    <h6><a href="">Legal Notices</a></h6>
                    <h6><a href="">Only on MovieOwl</a></h6>
                </Col>
            </Row>
        </Container>
    </>
}

export default Footer;