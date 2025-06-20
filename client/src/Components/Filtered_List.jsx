import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FilteredList.css"; // Optional custom styling

import { useApi } from '../context/ApiContext';




const Filtered_List = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { BASE_URL } = useApi();
  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  // Parse search filters from query string
  const searchParams = new URLSearchParams(location.search);
  const filters = {
    property_type: searchParams.get("property_type") || "",
    address_loc: searchParams.get("address_loc") || "",
    property_size: searchParams.get("property_size") || "",
    price: searchParams.get("price") || "",
  };

  // Fetch filtered properties whenever filters change
  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/filtered-properties`, {
        params: filters,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setProperties(res.data.properties);
        } else {
          setProperties([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      });
  }, [location.search]);

  // Handle view details button
  const handleDetailsClick = (propertyId) => {
    navigate(`/property_detail/${propertyId}?`);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Filtered Properties</h3>

      {properties.length === 0 ? (
        <div className="alert alert-warning text-center">
          No properties match your filters.
        </div>
      ) : (
        properties.map((prop) => (
          <div className="card shadow mb-4" key={prop.id}>
            <div className="row g-0 p-3 align-items-center">

              {/* Left: Image */}
              <div className="col-md-3 text-center">
                <img
                  src={`${BASE_URL}/images/${prop.image}`}
                  alt={prop.pro_name}
                  onError={(e) => { e.target.src = "/default-property.jpg"; }}
                  className="img-fluid rounded"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                />
              </div>

              {/* Center: Info */}
              <div className="col-md-6">
                <h5 className="mb-1">{prop.pro_name}</h5>
                <p className="mb-1"><strong>Owner:</strong> {prop.owner_name}</p>
                <p className="mb-1"><strong>City:</strong> {prop.city}</p>
              </div>

              {/* Right: Price and Details Button */}
              <div className="col-md-3 text-end">
                <h5 className="text-success">₹{parseFloat(prop.price).toLocaleString()}</h5>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleDetailsClick(prop.id)}
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Bottom: Description */}
            <div className="card-footer bg-light">
              <p className="mb-0">{prop.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Filtered_List;
