import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Display_Property from "./Display_Property";

const About = () => {
  return (
    <>
      <Navbar />

      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-4">About Us</h2>
          <p className="lead text-center mb-5">
            Welcome to DreamHome – your trusted partner in finding, buying, or selling real estate. Our mission is to simplify your property journey with transparency, trust, and technology.
          </p>

          <Row className="mb-5 align-items-center">
            <Col md={6}>
              <img
                src="/property_1.jpg"
                alt="Real Estate"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h4 className="fw-semibold mb-3">What Makes Us Different?</h4>
              <ul className="list-unstyled fs-5">
                <li>✔ Verified property listings</li>
                <li>✔ Easy-to-use search filters</li>
                <li>✔ Professional support & legal help</li>
                <li>✔ Fast property alerts</li>
              </ul>
            </Col>
          </Row>

          <h4 className="text-center mb-4">Our Journey in Pictures</h4>
          <Carousel fade className="mb-5 shadow rounded">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="../office.jpg"
                alt="Office"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h5>State-of-the-art Workspaces</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/meeting.webp"
                alt="Client Meeting"
                style={{ height: "400px", objectFit: "contain" }}
              />
              <Carousel.Caption>
                <h5>Building Dreams with Every Client</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/property_tour.jpg"
                alt="Property Tour"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h5>Top Properties at Top Locations</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <div className="container ">

    <Display_Property/>

    </div>

          <Row className="text-center mt-5">
            <Col md={4}>
              <img src="/trusted_user.webp" alt="Trust" className="mb-3 rounded-5"   height={220} width={300} />
              <h5 className="fw-bold">Trusted by 5,000+ Users</h5>
              <p>Thousands of happy families have found their dream homes with us.</p>
            </Col>
            <Col md={4}>
              <img src="/agents.jpeg" alt="Agents" className="mb-3 rounded-5" height={220} width={300} />
              <h5 className="fw-bold">Experienced Agents</h5>
              <p>Our team of experts ensures you get the right deal every time.</p>
            </Col>
            <Col md={4}>
              <img src="/customer_support.jpg" alt="Support" className="mb-3 rounded-5" height={220} width={300} />
              <h5 className="fw-bold">24/7 Customer Support</h5>
              <p>We're always here to guide you — from visit to registration.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default About;
