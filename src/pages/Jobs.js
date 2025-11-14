import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JobCard from "../components/JobCard";
import "../Styles/Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const location = useLocation();

  // ✅ Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  // ✅ Fetch jobs from your actual backend
  useEffect(() => {
    fetch("http://localhost:5063/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Jobs fetched:", data);
        setJobs(data);
      })
      .catch((err) => console.error("❌ Error fetching jobs:", err));
  }, []);

  // ✅ Filter jobs based on URL search term
  useEffect(() => {
    if (jobs.length === 0) return;

    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm)
    );

    console.log("🔍 Filtered Jobs:", filtered);
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  return (
    <div className="job-container">
      <h2>Available Jobs</h2>

      {/* Job List */}
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No jobs found for “{searchTerm}”.</p>
        )}
      </div>
    </div>
  );
}

export default Jobs;
