import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import L from "leaflet";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import Display_Property from "./Display_Property";

import { useApi } from '../context/ApiContext';




const Explore = () => {
  const { BASE_URL } = useApi();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/properties`) // adjust your API route
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Failed to load properties", err));
  }, []);

  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  return (
    <>
      <Navbar />

        <div className="container ">

    <Display_Property/>

    </div>


      <div className="container-fluid py-5 bg-light">
        <div className="row mb-4 text-center">
          <h2 className="fw-bold">Explore Properties on Map</h2>
          <p>Discover real estate listings visually across your favorite locations</p>
        </div>

        <div className="row px-3">
          <div className="col-12">
            <MapContainer center={[18.5204, 73.8567]} zoom={12} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {properties.map((property, index) => (
                <Marker
                  key={index}
                  position={[property.latitude, property.longitude]}
                  icon={defaultIcon}
                >
                  <Popup>
                    <strong>{property.name}</strong><br />
                    {property.address}<br />
                    ₹{property.price.toLocaleString()}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <div className="container my-5">

    <Testimonials/>

    </div>
      <Footer />
      
    </>
  );
};

export default Explore;
