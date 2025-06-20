import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";
import RequestCallModal from "./RequestCallModal";

import { useApi } from '../context/ApiContext';





const Navbar = () => {
  const { BASE_URL } = useApi();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("valid");
  const userId = localStorage.getItem("userId");

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/verify`, { withCredentials: true })
      .then((res) => {
        if (res.data.loginStatus) {
          axios
            .get(`${BASE_URL}/user/profile/${res.data.id}`)
            .then((res) => {
              setUserData(res.data);
// initialize editable form
            })
            .catch((err) => console.error("Profile fetch error", err));
        }
      })
      .catch((err) => console.error("Verification error", err));
  }, []);

  const handleLogout = async () => {
  try {
   



      await axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });


    // Clear all session-related data
    localStorage.removeItem("valid");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    

    // Redirect
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">

          {/* 👤 User Avatar (left corner) */}
          <div className="d-flex align-items-center">
            
            {/* 🔵 Logo */}
            <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
              <img src="/Logo.png" className="pt-1" alt="Logo" height={30} />
              <h3 className="ps-3 pb-1 mb-0">Skybridge</h3>
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto d-flex gap-4 text-center">
              <Link className="nav-link fs-5" to="/">Home</Link>
              <Link className="nav-link fs-5" to="/explore">
                <i className="bi bi-geo-alt-fill me-1"></i>Explore
              </Link>
              <Link className="nav-link fs-5" to="/about">About Us</Link>
              <Link className="nav-link fs-5" to="/contact">Contact Us</Link>
            </div>

            {/* 🔘 Right Section */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              <button className="btn btn-primary" onClick={handleShow}>
                <i className="bi bi-telephone me-2"></i>Request a Call
              </button>

              <div className="">
            {isLoggedIn && userData?.image && (
              <img
                src={`${BASE_URL}/images/${userData.image}`}
                alt="User"
                className="rounded-circle me-3"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            )}
          </div>

              {/* 👤 Dropdown */}
              {isLoggedIn ? (
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userData?.name?.split(" ")[0] || "Account"}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/profile">User Profile</Link></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    Login Options
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/admin_login">Admin Login</Link></li>
                    <li><Link className="dropdown-item" to="/register">User Register</Link></li>
                    <li><Link className="dropdown-item" to="/login">User Login</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          
        </div>
        
      </nav>

      {/* 🟣 Request Call Modal */}
      <RequestCallModal show={showModal} handleClose={handleClose} />
    </>
  );
};

export default Navbar;
