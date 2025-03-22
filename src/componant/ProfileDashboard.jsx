import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import UserContext
import "./css/ProfileDashboard.css"; // Import custom CSS

function ProfileDashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Access user and setUser from UserContext
  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    mobNum: "",
    address: "",
    dob: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/user-login"); // Redirect to login if no token is found
          return;
        }

        // Fetch profile data
        const response = await fetch("http://localhost:8080/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            userName: data.userName,
            email: data.email,
            mobNum: data.mobNum,
            address: data.address,
            dob: data.dob,
          });
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("An error occurred. Please try again.");
      }
    };

    fetchProfileData();
  }, [navigate]);

  return (
    <div className="profile-dashboard-container">
      <div className="profile-dashboard-card">
        <h2 className="profile-dashboard-title">Profile Dashboard</h2>
        {error && <div className="profile-dashboard-error">{error}</div>}
        {success && <div className="profile-dashboard-success">{success}</div>}

        <div className="profile-dashboard-content">
          {/* User Name */}
          <div className="profile-field">
            <label>User Name:</label>
            <span>{profileData.userName}</span>
          </div>

          {/* Email */}
          <div className="profile-field">
            <label>Email:</label>
            <span>{profileData.email}</span>
          </div>

          {/* Mobile Number */}
          <div className="profile-field">
            <label>Mobile Number:</label>
            <span>{profileData.mobNum}</span>
          </div>

          {/* Address */}
          <div className="profile-field">
            <label>Address:</label>
            <span>{profileData.address}</span>
          </div>

          {/* Date of Birth */}
          <div className="profile-field">
            <label>Date of Birth:</label>
            <span>{profileData.dob}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;