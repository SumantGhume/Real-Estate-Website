import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { useApi } from '../context/ApiContext';

const UserQuery = () => {
  
const { BASE_URL } = useApi();
  const [inquiries, setInquiries] = useState([]);
  const [activeReply, setActiveReply] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = () => {
    axios
      .get(`${BASE_URL}/admin/inquiries`)
      .then((res) => {
        if (res.data.success) {
          setInquiries(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (user_id, property_id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      axios
        .delete(`${BASE_URL}/admin/inquiries/${user_id}/${property_id}`)
        .then((res) => {
          if (res.data.success) {
            setInquiries((prev) =>
              prev.filter((inq) => !(inq.user_id === user_id && inq.property_id === property_id))
            );
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleReplyClick = (user_id, property_id) => {
    setActiveReply(`${user_id}-${property_id}`);
    setReplyText("");
  };

  const handleReplySend = (user_id, property_id) => {
    axios
      .post(`${BASE_URL}/admin/inquiries/reply`, {
        user_id,
        property_id,
        reply: replyText,
      })
      .then((res) => {
        if (res.data.success) {
          fetchInquiries();
          setActiveReply(null);
          setReplyText("");
        }
      })
      .catch((err) => console.error(err));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "Invalid date"
      : `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getFullYear()).slice(-2)}`;
  };

  return (
    <div className="container py-5">
      <h3 className="text-center mb-5 fw-bold text-primary">User Inquiries</h3>

      {inquiries.length === 0 ? (
        <div className="text-center text-muted py-3">No inquiries found.</div>
      ) : (
        <div className="row g-4">
          {inquiries.map((inq, index) => {
            const key = `${inq.user_id}-${inq.property_id}`;
            return (
              <div className="col-md-6" key={index}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={`${BASE_URL}/images/${inq.user_image}`}
                        alt={inq.user_name}
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <div>
                        <h6 className="mb-0">{inq.user_name}</h6>
                        <small className="text-muted">User ID: {inq.user_id}</small>
                      </div>
                    </div>

                    <h5 className="mb-2">{inq.property_name}</h5>
                    <p className="text-muted mb-2">
                      <strong>Property ID:</strong> {inq.property_id}
                    </p>
                    <p className="mb-3">
                      <strong>Message:</strong> {inq.message}
                    </p>

                    <p className="mb-2">
                      <strong>Admin Reply:</strong>{" "}
                      {inq.admin_reply ? (
                        <span className="badge bg-success">{inq.admin_reply}</span>
                      ) : (
                        <span className="badge bg-danger">Not Replied</span>
                      )}
                    </p>

                    <p className="mb-3">
                      <strong>Date:</strong> {formatDate(inq.created_at)}
                    </p>

                    {activeReply === key ? (
                      <>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="form-control mb-2"
                          rows={3}
                          placeholder="Write your reply..."
                        />
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleReplySend(inq.user_id, inq.property_id)}
                          >
                            Send
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setActiveReply(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleReplyClick(inq.user_id, inq.property_id)}
                        >
                          Reply
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(inq.user_id, inq.property_id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserQuery;
