// src/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useApi } from '../context/ApiContext';

const ProtectedRoute = ({ element: Component, role }) => {
  const [isAllowed, setIsAllowed] = useState(null);
  const { BASE_URL } = useApi();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/verify`, { withCredentials: true })
      .then((res) => {
        if (res.data.loginStatus) {
          if (!role || res.data.role === role) {
            setIsAllowed(true);
          } else {
            setIsAllowed(false); // wrong role
          }
        } else {
          setIsAllowed(false); // not logged in
        }
      })
      .catch(() => setIsAllowed(false));
  }, [role]);

  if (isAllowed === null) return <div>Loading...</div>; // or spinner

  return isAllowed ? Component : <Navigate to={role === "admin" ? "/admin_login" : "/login"} />;
};

export default ProtectedRoute;
