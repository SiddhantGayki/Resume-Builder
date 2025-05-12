// src/pages/DashboardPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Alpha Resume Builder</h1>
      <p>Create Professional Resumes/CVs </p>
      <div className="button-group">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
};

export default DashboardPage;
