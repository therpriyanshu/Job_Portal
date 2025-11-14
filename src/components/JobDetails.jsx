import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });

  useEffect(() => {
    fetch(`http://localhost:5063/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error("Error fetching job details:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Application submitted!\nName: ${formData.name}\nEmail: ${formData.email}`
    );
    // You can later POST this data to your backend
    setShowForm(false);
    setFormData({ name: "", email: "", resume: null });
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>
        <strong>Company:</strong> {job.company}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Description:</strong> {job.description}
      </p>
      <p>
        <strong>Salary:</strong> {job.salary}
      </p>

      {!showForm ? (
        <button className="apply-btn" onClick={() => setShowForm(true)}>
          Apply Now
        </button>
      ) : (
        <form className="apply-form" onSubmit={handleSubmit}>
          <h3>Apply for this job</h3>

          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Resume:</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}

export default JobDetails;
