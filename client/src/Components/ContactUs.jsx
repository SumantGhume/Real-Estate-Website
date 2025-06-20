import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <section className="py-5" style={{ background: "#f3f4f6" }}>
        <Container>
          <Row className="align-items-center justify-content-between">
            {/* Left Column */}
            <Col md={5}>
              <h2 className="fw-bold mb-4">Let's Talk</h2>
              <p className="mb-4">
                Have questions or want to book a property visit? Fill out the form or
                contact us directly and we’ll get back to you shortly.
              </p>

              <div className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-3 text-primary mt-1" size={20} />
                <span>
                  123 Real Estate Street, Pune, Maharashtra 411001
                </span>
              </div>

              <div className="mb-3 d-flex align-items-start">
                <FaPhoneAlt className="me-3 text-primary mt-1" size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="mb-4 d-flex align-items-start">
                <FaEnvelope className="me-3 text-primary mt-1" size={18} />
                <span>support@dreamhome.com</span>
              </div>

              <div className="d-flex gap-3 mt-4">
                <i className="bi bi-facebook fs-4 text-primary"></i>
                <i className="bi bi-twitter-x fs-4 text-dark"></i>
                <i className="bi bi-instagram fs-4 text-danger"></i>
              </div>
            </Col>

            {/* Right Column */}
            <Col md={6}>
              <div className="bg-white shadow p-4 rounded">
                <h5 className="text-center fw-semibold mb-3">Contact Us</h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Send Message
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;
