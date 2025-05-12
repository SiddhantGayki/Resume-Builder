// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ResumeFormPage from "./pages/ResumeFormPage";
import EditResumePage from "./pages/EditResumePage";
import ResumeListPage from "./pages/ResumeListPage";
import DashboardPage from "./pages/DashboardPage"; // ✅ New Dashboard
import { AuthProvider } from "./context/AuthContext";
import ResumePreview from "./pages/ResumePreview";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />           {/* ✅ Dashboard route */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resume" element={<ResumeFormPage />} />
          <Route path="/edit/:id" element={<EditResumePage />} />
          <Route path="/resumes" element={<ResumeListPage />} />
          <Route path="/preview" element={<ResumePreview />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
