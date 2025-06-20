import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useApi } from '../context/ApiContext';

const PropertySlider = () => {
  const { BASE_URL } = useApi();
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/user/display_properties`)
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.status === 'success' && Array.isArray(res.data.properties)) {
          setProperties(res.data.properties); // ✅ FIXED
        } else {
          setProperties([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setProperties([]);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2>Featured Listings</h2>
        <p className="text-muted">Browse our wide range of featured properties.</p>
      </div>

      {Array.isArray(properties) && properties.length > 0 ? (
        <Slider {...settings}>
          {properties.map((property) => (
            <div key={property.id} className="px-3 py-4">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: '15px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => navigate(`/property_detail/${property.id}`)}
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
        </Slider>
      ) : (
        <p className="text-center text-muted">No properties to display.</p>
      )}
    </div>
  );
};

export default PropertySlider;
