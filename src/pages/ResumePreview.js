import React from "react";
import "./ResumePreview.css";

const ResumePreview = ({ resumeData }) => {
  if (!resumeData) {
    return <div className="preview-container">No resume data available.</div>;
  }

  const { fullName, email, phone, summary, education, experience, skills } = resumeData;

  return (
    <div className="preview-container">
      <h1>{fullName}</h1>
      <p>{email} | {phone}</p>
      <hr />

      <section>
        <h2>Summary</h2>
        <p>{summary}</p>
      </section>

      <section>
        <h2>Education</h2>
        <p>{education}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <p>{experience}</p>
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          {skills && skills.split(",").map((skill, index) => (
            <li key={index}>{skill.trim()}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResumePreview;
