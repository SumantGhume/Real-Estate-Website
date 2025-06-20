// components/AdminLayout.jsx
import React from 'react';
import Admin_Navbar from './Admin_Navbar';
import Footer from '../Components/Footer';
 // or a specific AdminFooter if needed

const AdminLayout = ({ children }) => {
  return (
    <>
      <Admin_Navbar />
      <main className="container py-4">{children}</main>
        <Footer/>
    </>
  );
};

export default AdminLayout;
