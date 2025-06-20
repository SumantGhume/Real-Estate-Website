import axios from "axios";
import React, { useEffect, useState } from "react";
import { useApi } from '../context/ApiContext';

const AdminHome = () => {

  const { BASE_URL } = useApi();

  const [Total, setTotal] = useState({
    TotalUsers: "",
    TotalProperties: "",
  });

  useEffect(() => {
    TotalCount();
  }, []);

  const TotalCount = () => {
    axios
      .get(`${BASE_URL}/admin/total_count`)
      .then((result) => {
        if (result.data.status) {
          console.log(result.data);
          setTotal({
            TotalUsers: result.data.data.users,
            TotalProperties: result.data.data.properties,
          });
        } else {
          console.log(result.data.error);
        }
      })
      .catch((err) => {
        console.log("Error at axios in Admin count:", err);
      });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Total No. of Users</h4>
            <hr />
            <div className=" text-center">
              <h5>Total: {Total.TotalUsers}</h5>
            </div>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Total No. of Properties</h4>
            <hr />
            <div className=" text-center">
              <h5>Total: {Total.TotalProperties}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
