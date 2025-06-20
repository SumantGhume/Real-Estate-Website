import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from '../context/ApiContext';

const PropertyList = () => {
  const { BASE_URL } = useApi();
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/property_list`)
      .then((result) => {
        if (result.data.Status) {
          setProperty(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/admin/delete_property/` + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit_property/${id}`);
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Property List</h3>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Property ID</th>
              <th>Property Name</th>
              <th>Property Image</th>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {property.map((e, i) => (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.pro_name}</td>
                <td>
                  <img
                    src={`${BASE_URL}/images/${e.image}`}
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  />
                </td>
                <td>{e.owner_name}</td>
                <td>{e.email}</td>
                <td>{e.price}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(e.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyList;
