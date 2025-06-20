// components/RequestCallModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useApi } from '../context/ApiContext';

const RequestCallModal = ({ show, handleClose }) => {
  const { BASE_URL } = useApi();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend endpoint
      await axios.post(`${BASE_URL}/user/request-call`, form, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      alert("Call request submitted!");
      handleClose();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit request.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request a Call</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preferred Time</Form.Label>
            <Form.Control
              type="text"
              name="time"
              value={form.time}
              onChange={handleChange}
              placeholder="e.g. Tomorrow at 11 AM"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Submit Request
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestCallModal;
