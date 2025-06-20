import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useApi } from '../context/ApiContext';
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: "",
  });
  const { BASE_URL } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("address", user.address);
    formData.append("phone", user.phone);
    formData.append("image", user.image);

    try {
      const result = await axios.post(`${BASE_URL}/user/register`, formData);
      if (result.data.Status) {
        alert("Registration successful!");
      } else {
        alert(result.data.Error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded border loginForm w-100" style={{ maxWidth: "350px" }}>
        <h4 className="text-center mb-3">User Register</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your name"
              required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your email"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="form-label">Address:</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Your address"
              required
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="form-label">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Phone number"
              required
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Profile Image:</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={(e) => setUser({ ...user, image: e.target.files[0] })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Register
          </button>

          <p className="text-center small">
            Already registered?{" "}
            <Link to="/login" className="text-decoration-none">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
