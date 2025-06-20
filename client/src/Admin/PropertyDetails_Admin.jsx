import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useApi } from '../context/ApiContext';

const PropertyDetail = () => {
  const { id } = useParams();
  const { BASE_URL } = useApi();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/property/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setProperty(res.data.property);
        } else {
          alert("Property not found");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error loading property data");
      });
  }, [id]);

  if (!property)
    return <div className="container my-5 text-center">Loading...</div>;

  const featureLabels = {
    air_conditioning: "Air Conditioning",
    shared_gym: "Shared Gym",
    external_yard: "External Yard",
    dryer: "Dryer",
    gym: "Gym",
    laundry: "Laundry",
    kitchen_appliances: "Kitchen Appliances",
    outdoor_shower: "Outdoor Shower",
    two_refrigerators: "Two Refrigerators",
    club_house: "Club House",
    tv_cable: "TV Cable",
    washer: "Washer",
  };

  return (
    <div className="container my-5">
      <div className="container py-4">
        <div className="mb-4 border-bottom pb-3">
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h3 className="fw-bold">{property.pro_name}</h3>
              <p className="text-muted mb-1">
                <i className="bi bi-geo-alt-fill me-1"></i> {property.city}
              </p>
              <div className="d-flex gap-2">
                <span className="badge bg-success">
                  {property.property_status}
                </span>
                <span className="badge bg-primary">FEATURED</span>
              </div>
            </div>
            <div className="text-end">
              <h4 className="fw-semibold text-dark mt-2">
                ₹{parseFloat(property.price).toLocaleString()}/mo
              </h4>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Left Side: Image Section */}
          <div className="col-lg-8 mb-4">
            <img
              src={`${BASE_URL}/images/${property.image}`}
              alt={property.pro_name}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
            />
            <div className="d-flex gap-2 overflow-auto">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <img
                  key={index}
                  src={`${BASE_URL}/images/${property.image}`}
                  alt={`thumb-${index}`}
                  className="img-thumbnail"
                  style={{
                    width: "100px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="card p-3 mb-4">
        <h5 style={{ background: "#f3f3f3", borderRadius: "0.5rem", padding: "1rem 0.5rem" }}>
          Overview
        </h5>
        <div className="row text-muted ps-3">
          <div className="col-md-2"><strong>Type:</strong> {property.property_type}</div>
          <div className="col-md-2"><strong>Year Built:</strong> 2015</div>
          <div className="col-md-2"><strong>Size:</strong> {property.property_size} m²</div>
          <div className="col-md-2"><strong>Bedrooms:</strong> {property.no_bedrooms}</div>
          <div className="col-md-2"><strong>Bathrooms:</strong> {property.no_bathrooms}</div>
          <div className="col-md-2"><strong>Garage:</strong> {property.no_garage}</div>
        </div>
      </div>

      {/* Address */}
      <div className="card p-3 mb-4">
        <h5 style={{ background: "#f3f3f3", borderRadius: "0.5rem", padding: "1rem 0.5rem" }}>
          Address
        </h5>
        <div className="row text-muted ps-3">
          <div className="col-md-4"><strong>Address:</strong> {property.address_loc}, {property.zip_code}</div>
          <div className="col-md-2"><strong>City:</strong> {property.city}</div>
          <div className="col-md-2"><strong>Area:</strong> {property.area}</div>
          <div className="col-md-2"><strong>State:</strong> {property.state}</div>
          <div className="col-md-2"><strong>Country:</strong> {property.country}</div>
        </div>
      </div>

      {/* Description */}
      <div className="card p-3 mb-4">
        <h5 style={{ background: "#f3f3f3", borderRadius: "0.5rem", padding: "1rem 0.5rem" }}>
          Description
        </h5>
        <p className="text-muted ps-3">{property.description}</p>
      </div>

      {/* Details */}
      <div className="card p-3 mb-4">
        <h5 style={{ background: "#f3f3f3", borderRadius: "0.5rem", padding: "1rem 0.5rem" }}>
          Details
        </h5>
        <div className="row text-muted ps-3">
          <div className="col-md-3"><strong>Property ID:</strong> {id}</div>
          <div className="col-md-3"><strong>Size:</strong> {property.property_size} m²</div>
          <div className="col-md-3"><strong>Status:</strong> {property.property_status}</div>
          <div className="col-md-3"><strong>Type:</strong> {property.property_type}</div>
          <div className="col-md-3"><strong>Bedrooms:</strong> {property.no_bedrooms}</div>
          <div className="col-md-3"><strong>Bathrooms:</strong> {property.no_bathrooms}</div>
        </div>
      </div>

      {/* Features */}
      <div className="card p-3 mb-4">
        <h5 style={{ background: "#f3f3f3", borderRadius: "0.5rem", padding: "1rem 0.5rem" }}>
          Features
        </h5>
        <div className="row ps-3">
          {property.features &&
            Object.entries(property.features).map(
              ([key, value]) =>
                value && (
                  <div key={key} className="col-md-3 col-sm-4 col-6 mb-2">
                    <span className="badge text-dark border-secondary fs-6 d-flex align-items-center">
                      <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.75 2.21875C13.0243 2.21875 10.3599 3.02701 8.09355 4.54131C5.82724 6.05561 4.06086 8.20795 3.01779 10.7261C1.97472 13.2443 1.70181 16.0153 2.23356 18.6886C2.76531 21.3619 4.07785 23.8175 6.00519 25.7448C7.93253 27.6722 10.3881 28.9847 13.0614 29.5164C15.7347 30.0482 18.5057 29.7753 21.0239 28.7322C23.5421 27.6891 25.6944 25.9228 27.2087 23.6565C28.723 21.3901 29.5313 18.7257 29.5313 16C29.5313 12.345 28.0793 8.83967 25.4948 6.25518C22.9103 3.6707 19.405 2.21875 15.75 2.21875ZM13.7813 21.5027L8.85938 16.5808L10.4245 15.0156L13.7813 18.3723L21.0755 11.0781L22.6465 12.6393L13.7813 21.5027Z" fill="#2495FD"/>
                      </svg> 
                      
                      <span className="ps-2">{featureLabels[key] || key}</span>
                    </span>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
