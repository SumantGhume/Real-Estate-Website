import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import { useApi } from '../context/ApiContext';

const Display_Property = () => {
  const { BASE_URL } = useApi();
  const [properties, setProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [role, setRole] = useState(null); // to store admin/user
  const navigate = useNavigate();

  // Fetch role on mount
  useEffect(() => {
    axios.get(`${BASE_URL}/user/verify`, { withCredentials: true })
      .then(res => {
        if (res.data.loginStatus) {
          setRole(res.data.role); // "admin" or "user"
        }
      })
      .catch(err => {
        console.error("Role check failed:", err);
        setRole(null); // assume guest if error
      });
  }, []);

  // Fetch properties
  useEffect(() => {
    axios.get(`${BASE_URL}/user/display_properties`)
      .then(res => {
        if (res.data.status === "success") {
          setProperties(res.data.properties);
        }
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
      });
  }, []);

  // Handle card click based on role
  const handleCardClick = (id) => {
    if (role === "admin") {
      navigate(`/admin_property-details/${id}`);
    } else {
      navigate(`/property_detail/${id}`);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <section>
      <div className="container py-5">
        <div className="text-center">
          <p className='fs-1'>Explore Our Properties</p>
          <p className='fs-4 text-muted'>Enjoy the variety of 100+ Different properties in the market!</p>
        </div>

        <div className="row">
          {properties.slice(0, visibleCount).map((property) => (
            <div key={property.id} className="col-md-4 mb-4">
              <div
                className="card border-0 shadow h-100"
                style={{ borderRadius: '15px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => handleCardClick(property.id)}
              >
                <div className="position-relative">
                  <img
                    src={`${BASE_URL}/images/${property.image}`}
                    alt={property.pro_name}
                    className="img-fluid"
                    style={{ height: '230px', width: '100%', objectFit: 'cover' }}
                  />
                  <span className="badge bg-success position-absolute top-0 start-0 m-2">
                    {property.property_status}
                  </span>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-start text-muted mb-2">
                    <div className="me-3"><FaBed /> {property.no_bedrooms}</div>
                    <div className="me-3"><FaBath /> {property.no_bathrooms}</div>
                    <div><FaRulerCombined /> {property.property_size} m²</div>
                  </div>
                  <h5 className="card-title">{property.pro_name}</h5>
                  <p className="text-muted mb-0">
                    <FaMapMarkerAlt className="me-1" />
                    {property.address_loc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < properties.length && (
          <div className="text-center mt-4">
            <button className="btn btn-primary fs-5" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Display_Property;
