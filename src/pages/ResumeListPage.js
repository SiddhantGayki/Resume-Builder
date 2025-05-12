import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './ResumeListPage.css';

const ResumeListPage = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://localhost:5000/api/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes(res.data);
    } catch (err) {
      console.error("Failed to fetch resumes", err);
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:5000/api/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchResumes(); // Refresh list
    } catch (err) {
      console.error("Failed to delete resume", err);
    }
  };

  const editResume = (resume) => {
    // Pass resume data via navigation (or use state manager)
    navigate("/resume", { state: { resume } });
  };

  const downloadPDF = async (resumeId) => {
    const resumeElement = document.getElementById(`resume-${resumeId}`);
    const canvas = await html2canvas(resumeElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div>
      <h2>Saved Resumes</h2>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <ul>
          {resumes.map((resume) => (
            <li key={resume._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
              <div id={`resume-${resume._id}`}>
                <h3>{resume.fullName}</h3>
                <p><strong>Email:</strong> {resume.email}</p>
                <p><strong>Phone:</strong> {resume.phone}</p>
                <p><strong>Summary:</strong> {resume.summary}</p>
                <p><strong>Education:</strong> {resume.education}</p>
                <p><strong>Experience:</strong> {resume.experience}</p>
                <p><strong>Skills:</strong> {resume.skills}</p>
              </div>
              <button onClick={() => downloadPDF(resume._id)}>Download as PDF</button>
              <button onClick={() => editResume(resume)} style={{ marginLeft: "10px" }}>Edit</button>
              <button onClick={() => deleteResume(resume._id)} style={{ marginLeft: "10px", color: "red" }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeListPage;
