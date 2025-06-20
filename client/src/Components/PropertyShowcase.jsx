import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PropertyShowcase = () => {
  return (
    <section className="py-1">
      <Container>
        <Row className="align-items-center ">
          {/* Left large image */}
          <Col md={6} >
            <img
              src="../public/left.jpg" // Replace with your actual image path
              alt="Main Property"
              className="mb-3"
              style={{ height: '30rem', width: '100%', objectFit: 'cover',borderRadius:"12% 0 0 12%" }}
           
            />
          </Col>

          {/* Right content and small images */}
          <Col md={6}>
            <Row className=" ">
              <Col xs={6} className="mb-4" >
                <img
                  src="../public/top.jpg"
                  alt="Small 1"
                  className="img-fluid"
                  
                />
              </Col>
              <Col>
                <h4>Wide Selection Of Properties</h4>
                <p className="text-muted mb-0">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  <br />
                  Lorem Ipsum has been the industry's standard.
                </p>
                <hr style={{ width: '60px', borderTop: '3px solid #007bff', marginTop: '10px' }} />
              </Col>
            </Row>

            {/* Small images grid */}
            <Row style={{ height: '100%', width: '100%'}}>
              <Col xs={8}>
              <Col xs={12} className="mb-3">
                <img
                  src="../public/left.jpg"
                  alt="Small 2"
                  className="img-fluid"
                  
                />
              </Col>
              </Col>
              <Col xs={4}>
              <Col xs={12}>
                <img
                  src="../public/left.jpg"
                  alt="Small 3"
                  className="img-fluid "
                  style={{ height: '100%', width: '100%', objectFit: 'cover',borderRadius:"0 20% 0 0" }}
                />
              </Col>
              <Col xs={12}>
                <img
                  src="../public/left.jpg"
                  alt="Small 4"
                  className="img-fluid  mt-3"
                  style={{ height: '100%', width: '100%', objectFit: 'cover',borderRadius:"0 0 20% 0" }}
                />
              </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PropertyShowcase;
