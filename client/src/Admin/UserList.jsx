import axios from "axios";
import React, { useEffect, useState } from "react";
import { useApi } from '../context/ApiContext';


const UserList = () => {
  const { BASE_URL } = useApi();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/user_list`)
      .then((result) => {
        if (result.data.Status) {
          setUser(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${BASE_URL}/admin/delete_user/` + id)
        .then((result) => {
          if (result.data.Status) {
            window.location.reload();
          } else {
            alert(result.data.Error);
          }
        });
    }
  };

  return (
    <div className="container my-5">
      <style>{`
        .card {
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }
        .rounded-circle {
          border: 2px solid #0d6efd;
        }
        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: white;
        }
      `}</style>

      <h2 className="text-center mb-4 text-primary">User List</h2>

      <div className="row">
        {user.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          user.map((e, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <img
                    src={`${BASE_URL}/images/${e.image}`}
                    alt="User"
                    className="rounded-circle mb-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <h5 className="card-title">{e.name}</h5>
                  <p className="mb-1"><strong>Email:</strong> {e.email}</p>
                  <p className="mb-1"><strong>Phone:</strong> {e.phone}</p>
                  <p className="mb-3 text-center"><strong>Address:</strong> {e.address}</p>
                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
