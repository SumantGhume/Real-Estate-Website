import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FilteredList.css";
import { useApi } from "../context/ApiContext";

const FilteredList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { BASE_URL } = useApi();

  const searchParams = new URLSearchParams(location.search);
  const filters = {
    property_type: searchParams.get("property_type") || "",
    address_loc: searchParams.get("address_loc") || "",
    property_size: searchParams.get("property_size") || "",
    price: searchParams.get("price") || "",
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
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
        setError("Failed to load properties.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search]);

  const handleDetailsClick = (propertyId) => {
    navigate(`/property_detail/${propertyId}`);
  };

  return (
    <main className="container mt-5">
      <h3 className="mb-4">Filtered Properties</h3>

      {loading && (
        <div className="alert alert-info text-center">Loading properties...</div>
      )}

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {!loading && properties.length === 0 && !error && (
        <div className="alert alert-warning text-center">
          No properties match your filters.
        </div>
      )}

      {properties.map((prop) => (
        <article className="card shadow mb-4" key={prop.id}>
          <div className="row g-0 p-3 align-items-center">

            {/* Image */}
            <div className="col-md-3 text-center">
              <img
                src={`${BASE_URL}/images/${prop.image}`}
                alt={prop.pro_name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-property.jpg";
                }}
                className="img-fluid rounded"
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            </div>

            {/* Info */}
            <div className="col-md-6">
              <h5 className="mb-1">{prop.pro_name}</h5>
              <p className="mb-1"><strong>Owner:</strong> {prop.owner_name}</p>
              <p className="mb-1"><strong>City:</strong> {prop.city}</p>
            </div>

            {/* Price and Button */}
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

          {/* Description */}
          <div className="card-footer bg-light">
            <p className="mb-0">{prop.description}</p>
          </div>
        </article>
      ))}
    </main>
  );
};

export default FilteredList;
