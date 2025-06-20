import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5">
      {/* Newsletter Signup */}
      <div className="container pb-4 border-bottom border-secondary">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5>Newsletter Signup</h5>
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container py-5">
        <div className="row">
          {/* Logo and About */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-2">
              <img
                src="/Logo.png"
                alt="Logo"
                className="me-2"
              />
              <h4 className="mb-0">Skybridge</h4>
            </div>
            <p className="text-light small">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod.
            </p>
          </div>

          {/* Explore */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Explore</h6>
            <ul className="list-unstyled">
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Services</h6>
            <ul className="list-unstyled">
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <ul className="list-unstyled">
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
              <li><span className="text-primary">•</span> Lorem Ipsum</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black text-center py-3">
        <small>© Lorem Ipsum - All rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
