// src/Components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh" }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
