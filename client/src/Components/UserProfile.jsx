import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useApi } from '../context/ApiContext';

const UserProfile = () => {
  const { BASE_URL } = useApi();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/verify`, { withCredentials: true })
      .then((res) => {
        if (res.data.loginStatus) {
          axios
            .get(`${BASE_URL}/user/profile/${res.data.id}`)
            .then((res) => {
              setUser(res.data);
              setFormData(res.data); // initialize editable form
            })
            .catch((err) => console.error("Profile fetch error", err));
        }
      })
      .catch((err) => console.error("Verification error", err));
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
  try {
    // 1. Update text info (name, email, etc.)
    await axios.put(`${BASE_URL}/user/update/${user.id}`, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    });

    let updatedImage = formData.image;

    // 2. If a new image is selected, upload it
    if (selectedImage) {
      const formImage = new FormData();
      formImage.append("image", selectedImage);

      const imageRes = await axios.post(
        `${BASE_URL}/user/upload-image/${user.id}`,
        formImage,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      updatedImage = imageRes.data.filename;
    }

    // 3. Refresh data
    const updatedUser = {
      ...formData,
      image: updatedImage,
    };

    setUser(updatedUser);
    setFormData(updatedUser);
    setEditMode(false);
    setSelectedImage(null);
    setPreview("");

    alert("Profile updated successfully.");
  } catch (err) {
    if (err.response?.status === 409) {
      alert("Email already exists.");
    } else {
      console.error("Update failed:", err);
      alert("Something went wrong!");
    }
  }
};



  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="bg-light">
      <div className="container py-5">
        <div className="row">
          <div className="col-12 mb-4">
            <div
              className="profile-header position-relative mb-4 rounded"
              style={{
                background: "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
                height: "150px",
              }}
            ></div>

            <div className="text-center">
              <div className="position-relative d-inline-block">
                <img
                  src={
                    preview ||
                    `${BASE_URL}/images/${formData.image || "default.jpg"}`
                  }
                  className="rounded-circle profile-pic"
                  alt="Profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    border: "4px solid #fff",
                    marginTop: "-60px",
                    backgroundColor: "#fff",
                    objectFit: "cover",
                  }}
                />
                <label
                  htmlFor="imageUpload"
                  className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-camera"></i>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <h3 className="mt-3 mb-1">{formData.name}</h3>
              <p className="text-muted mb-3">
                {formData.role === "admin" ? "Administrator" : "Registered User"}
              </p>

              {!editMode ? (
                <button className="btn btn-primary" onClick={handleEditToggle}>
                  <i className="fas fa-user-edit me-2"></i>Edit Profile
                </button>
              ) : (
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success" onClick={handleSubmit}>
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditMode(false);
                      setFormData(user);
                      setSelectedImage(null);
                      setPreview("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="mb-4">Personal Information</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      readOnly={!editMode}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly={!editMode}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      readOnly={!editMode}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea
                      name="address"
                      className="form-control"
                      rows="3"
                      value={formData.address || ""}
                      onChange={handleChange}
                      readOnly={!editMode}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default UserProfile;
