import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";
import { useApi } from '../context/ApiContext';

const Admin_Navbar = () => {
  
const { BASE_URL } = useApi();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });
      localStorage.removeItem("valid");
      localStorage.removeItem("role");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">
        {/* Left: Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          <div className="d-flex align-items-center">
            <img src="/Logo.png" className="pt-1" alt="Logo" height={30} />
            <h4 className="ps-3 pb-1 mb-0">RealEstate Admin</h4>
          </div>
        </Link>

        {/* Toggler for mobile */}
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

        {/* Center & Right: Links and Logout */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {/* Center Links */}
          <div className="navbar-nav mx-auto d-flex gap-4 text-center">
            <Link className="nav-link fs-5" to="/admin_dashboard">Dashboard</Link>
            <Link className="nav-link fs-5" to="/add-property">Add Property</Link>
            <Link className="nav-link fs-5" to="/user-details">User Details</Link>
            <Link className="nav-link fs-5" to="/user-query">User Query</Link>
            <Link className="nav-link fs-5" to="/property-list">List of Property</Link>
          </div>

          {/* Right Logout Button */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    
  );
};

export default Admin_Navbar;
