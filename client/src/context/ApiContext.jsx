import React, { createContext, useContext } from "react";

// ✅ Set your base URL here (local, Railway, etc.)
const BASE_URL = "https://real-estate-website-sumantghumes-projects.vercel.app/"; // Change this in one place

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={{ BASE_URL }}>
      {children}
    </ApiContext.Provider>
  );
};

// 🔁 Use this hook in any component to access base URL
export const useApi = () => useContext(ApiContext);
