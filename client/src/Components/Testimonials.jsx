// Testimonials.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useApi } from '../context/ApiContext';
// import "./Testimonials.css"; // custom CSS if needed

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { BASE_URL } = useApi();

  useEffect(() => {
    fetch(`${BASE_URL}/user/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Fetch testimonials error", err));
  }, []);

  const formatDate = (dateStr) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container my-5 testimonials">
      <h2 className="text-center fw-bold mb-2">Testimonials</h2>
      <p className="text-center text-muted mb-5">What Our Clients Say About Us!</p>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div className=" text-center p-3 ">
              <img
                src={`${BASE_URL}/images/${t.image}`}
                alt={t.name}
                className="rounded-circle mx-auto mb-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <h5>{t.name}</h5>
              <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                {formatDate(t.submitted_at)}
              </p>
              <p className="fst-italic">“{t.message}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
