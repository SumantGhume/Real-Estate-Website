import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Display_Property from "./Display_Property";
import PropertySlider from "./PropertySlider";
import Navbar from "./Navbar";
import PropertyShowcase from "./PropertyShowcase";
import ReviewForm from "./ReviewForm";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id)

  const [filters, setFilters] = useState({
    property_type: "",
    address_loc: "",
    property_size: "",
    price: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
  const queryParams = new URLSearchParams({ ...filters }).toString();
  navigate(`/filtered_List?${queryParams}`);
};


  return (
    <>

    
    <div className="hero_section " style={{padding:"8rem 0"}}>

    <div className="container  ">
      <h1 className="text-center mb-4 text-white" style={{fontSize:"3rem"}}>Your Dream Home is One Click Away</h1>
      <p className="text-center mb-4 text-white fs-1">is One Click Away</p>

      <div className="row g-3 justify-content-center pt-3">
        <div className="col-md-2">
          <input
            type="text"
            name="property_type"
            className="form-control"
            placeholder="Property Type"
            value={filters.property_type}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            name="address_loc"
            className="form-control"
            placeholder="City"
            value={filters.address_loc}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            name="property_size"
            className="form-control"
            placeholder="Property Size (e.g. 2 BHK or 1200 sqft)"
            value={filters.property_size}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Max Price"
            value={filters.price}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>

    </div>

    <div className="container ">

    <Display_Property/>

    </div>
    <div className="container my-5">

    <PropertyShowcase/>

    </div>
    <div className="">

    <ReviewForm userId={localStorage.getItem("userId")} />


    </div>
    <div className="container my-5">

    <PropertySlider/>

    </div>
    <div className="container my-5">

    <Testimonials/>

    </div>

    </>
  );
};

export default Home;
