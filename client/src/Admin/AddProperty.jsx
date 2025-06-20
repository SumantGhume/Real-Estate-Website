import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';


const AddProperty = () => {

  const { BASE_URL } = useApi();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    pro_name: "",
    owner_name: "",
    price: "",
    image: null,
    description: "",
    address_loc: "",
    city: "",
    zip_code: "",
    area: "",
    country: "",
    state: "",
    property_type: "",
    property_status: "",
    property_size: "",
    no_bedrooms: "",
    no_bathrooms: "",
    no_garage: "",
    air_conditioning: false,
    shared_gym: false,
    external_yard: false,
    dryer: false,
    gym: false,
    laundry: false,
    kitchen_appliances: false,
    outdoor_shower: false,
    two_refrigerators: false,
    club_house: false,
    tv_cable: false,
    washer: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const numericFields = ['price', 'zip_code', 'no_bedrooms', 'no_bathrooms', 'no_garage'];

    for (const key in formData) {
      if (numericFields.includes(key)) {
        data.append(key, parseInt(formData[key]) || 0);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.post(`${BASE_URL}/admin/add_property`, data);
      alert("Property added successfully!");
      navigate('/admin_dashboard/');
    } catch (err) {
      console.error(err);
      alert("Error adding property.");
    }
  };

  return (
    <div className="loginPage">
      <div className="container py-5">
        <div className="card shadow-lg loginForm p-4">
          <h2 className="text-center mb-4 text-primary">Add New Property</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Basic Info */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <input type="text" name="pro_name" placeholder="Property Name" onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <input type="text" name="owner_name" placeholder="Owner Name" onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <input type="number" name="price" placeholder="Price" onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <input type="file" name="image" onChange={handleFileChange} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <textarea name="description" placeholder="Description" onChange={handleChange} className="form-control" />
              </div>
            </div>

            {/* Address */}
            <h5 className="mt-4 text-secondary">Address Details</h5>
            <div className="row">
              {["address_loc", "city", "zip_code", "area", "country", "state"].map((field, idx) => (
                <div className="col-md-4 mb-3" key={idx}>
                  <input
                    type={field === "zip_code" ? "number" : "text"}
                    name={field}
                    placeholder={field.replace(/_/g, " ").toUpperCase()}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              ))}
            </div>

            {/* Property Details */}
            <h5 className="mt-4 text-secondary">Property Details</h5>
            <div className="row">
              {["property_type", "property_status", "property_size", "no_bedrooms", "no_bathrooms", "no_garage"].map((field, idx) => (
                <div className="col-md-4 mb-3" key={idx}>
                  <input
                    type={["no_bedrooms", "no_bathrooms", "no_garage"].includes(field) ? "number" : "text"}
                    name={field}
                    placeholder={field.replace(/_/g, " ").toUpperCase()}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              ))}
            </div>

            {/* Features */}
            <h5 className="mt-4 text-secondary">Features</h5>
            <div className="row">
              {[
                "air_conditioning", "shared_gym", "external_yard", "dryer", "gym", "laundry",
                "kitchen_appliances", "outdoor_shower", "two_refrigerators", "club_house", "tv_cable", "washer"
              ].map((feature, idx) => (
                <div className="col-md-4 mb-2" key={idx}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={feature}
                      checked={formData[feature]}
                      onChange={handleChange}
                      id={feature}
                    />
                    <label className="form-check-label" htmlFor={feature}>
                      {feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary px-5">Add Property</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
