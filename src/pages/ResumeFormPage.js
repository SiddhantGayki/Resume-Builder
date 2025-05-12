import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import './ResumeFormPage.css';

const ResumeFormPage = () => {
  const { user } = useAuth(); // Correct usage of user context
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [summary, setSummary] = useState("");

  const handleGenerateSummary = () => {
    const generated = `A highly motivated and experienced ${jobTitle} with a strong background in ${experience}. 
Skilled in ${skills}. 
Educational qualifications include ${education}. 
Known for excellent communication and problem-solving skills.`;

    setSummary(generated);
  };

  return (
    <div className="resume-container">
      <h1>Professional Resume Summary Generator</h1>

      <div className="resume-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Phone Number:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Job Title:</label>
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />

        <label>Experience:</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} />

        <label>Education:</label>
        <textarea value={education} onChange={(e) => setEducation(e.target.value)} />

        <label>Skills:</label>
        <textarea value={skills} onChange={(e) => setSkills(e.target.value)} />

        <button onClick={handleGenerateSummary}>Generate Summary</button>
      </div>

      {summary && (
        <div className="resume-summary">
          <h2>Generated Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeFormPage;
