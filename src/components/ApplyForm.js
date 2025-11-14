import React, { useState } from "react";

function ApplyForm({ jobId }) {
  const [formData, setFormData] = useState({ name: "", email: "", resume: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted"); // ✅ Check if this shows
    console.log("Job ID being used:", jobId);
    const payload = { email: formData.email }; // backend only needs email
    fetch(`https://job-portal-backend-rqau.onrender.com/jobs${jobId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err);
        }
        return res.json();
      })
      .then(() => alert("Application submitted successfully!"))
      .catch((err) => alert("Failed to apply: " + err.message));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="file"
        onChange={(e) =>
          setFormData({ ...formData, resume: e.target.files[0] })
        }
        required
      />
      <button type="submit">Apply</button>
    </form>
  );
}

export default ApplyForm;
