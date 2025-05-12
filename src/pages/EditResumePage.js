import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './EditResumePage.css';

const EditResumePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/resumes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumeData(res.data);
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };

    fetchResume();
  }, [id]);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/resumes/${id}`, resumeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Resume updated!");
      navigate("/resumes");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      <h2>Edit Resume</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={resumeData.name} onChange={handleChange} placeholder="Name" required /><br />
        <input name="email" value={resumeData.email} onChange={handleChange} placeholder="Email" required /><br />
        <textarea name="education" value={resumeData.education} onChange={handleChange} placeholder="Education" /><br />
        <textarea name="experience" value={resumeData.experience} onChange={handleChange} placeholder="Experience" /><br />
        <input name="skills" value={resumeData.skills} onChange={handleChange} placeholder="Skills" /><br />
        <button type="submit">Update Resume</button>
      </form>
    </div>
  );
};

export default EditResumePage;
