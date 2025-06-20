import React from "react";
import Register from "./Login_Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login_Register/Login";
import HomePage from "./Components/HomePage";
import Admin_Login from "./Admin/Admin_Login";
import AdminDashboard from "./Admin/AdminDashboard";
import AddProperty from "./Admin/AddProperty";
import UserList from "./Admin/UserList";
import UserQuery from "./Admin/UserQuery";
import PropertyList from "./Admin/PropertyList";
import Filtered_List from "./Components/Filtered_List";
import PropertyDetail from "./Components/Property_detail";
import Display_Property from "./Components/Display_Property";
import EditProperty from "./Admin/EditProperty";
import UserProfile from "./Components/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout"; // ✅ import layout
import Explore from "./Components/Explore";
import About from "./Components/About";
import ContactUs from "./Components/ContactUs";
import AdminLayout from "./Admin/AdminLayout";
import PropertyDetails_Admin from "./Admin/PropertyDetails_Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages that include Navbar and Footer */}

        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />

        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/display_property" element={<Layout><Display_Property /></Layout>} />
        <Route path="/filtered_List" element={<Layout><Filtered_List /></Layout>} />
        <Route path="/property_detail/:id" element={<Layout><PropertyDetail /></Layout>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/profile" element={<Layout><ProtectedRoute role="user" element={<UserProfile />} /></Layout>} />

{/* Admin routes (if they should NOT have Navbar/Footer) */}

        <Route path="/admin_login" element={<Layout><Admin_Login /></Layout>} />
        
        <Route path="/admin_dashboard" element={<AdminLayout><ProtectedRoute role="admin" element={<AdminDashboard />} /></AdminLayout>} />
        <Route path="/add-property" element={<AdminLayout><ProtectedRoute role="admin" element={<AddProperty />} /></AdminLayout>} />
        <Route path="/edit_property/:id" element={<AdminLayout><ProtectedRoute role="admin" element={<EditProperty />} /></AdminLayout>} />
        <Route path="/user-details" element={<AdminLayout><ProtectedRoute role="admin" element={<UserList />} /></AdminLayout>} />
        <Route path="/user-query" element={<AdminLayout><ProtectedRoute role="admin" element={<UserQuery />} /></AdminLayout>} />
        <Route path="/property-list" element={<AdminLayout><ProtectedRoute role="admin" element={<PropertyList />} /></AdminLayout>} />
        <Route path="/admin_property-details/:id" element={<AdminLayout><ProtectedRoute role="admin" element={<PropertyDetails_Admin/>} /></AdminLayout>} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
