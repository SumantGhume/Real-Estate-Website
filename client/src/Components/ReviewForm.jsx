import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useApi } from "../context/ApiContext";
const ReviewForm = () => {
  const { BASE_URL } = useApi();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rating: "",
    message: "",
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/verify`, {
          withCredentials: true,
        });
        if (res.data.loginStatus) {
          setUserId(res.data.id);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please login to submit feedback.");
      return;
    }
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.rating
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = { user_id: userId, ...formData };
    console.log("Submitting feedback payload:", payload); // ✅ Add this line

    try {
      await axios.post(`${BASE_URL}/user/feedback`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert("Feedback submitted successfully!");
      setFormData({ name: "", email: "", phone: "", rating: "", message: "" });
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        JSON.stringify(err);

      console.error("Error submitting feedback:", errorMessage);
      alert("Error submitting feedback.");
    }
  };

  return (
    <div className="container-fluid py-5 text-white feedback_section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-4">
              Why Our Service Is The Perfect Choice?
            </h2>
            <div className="mb-4">
              <h5>01. Trusted Experts</h5>
              <p>
                Our team is made up of experienced professionals ready to help
                you every step of the way.
              </p>
            </div>
            <div className="mb-4">
              <h5>02. Verified Listings</h5>
              <p>
                We ensure every property listing is authenticated and up to
                date.
              </p>
            </div>
            <div className="mb-4">
              <h5>03. Hassle-Free Process</h5>
              <p>
                From inquiry to closure, our platform keeps everything simple
                and transparent.
              </p>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="col-md-6  d-flex justify-content-end">
            <div className="bg-white text-dark p-4 rounded  shadow w-75">
              <h5 className="mb-3 text-center">User Feedback</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone (Optional)</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91-9876543210"
                  />
                </div>

                {/* ✅ Rating Dropdown */}
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select
                    className="form-control"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a rating</option>
                    <option value="1">⭐ 1 - Poor</option>
                    <option value="2">⭐⭐ 2 - Fair</option>
                    <option value="3">⭐⭐⭐ 3 - Good</option>
                    <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please enter your message"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
