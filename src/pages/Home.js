import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Home.css";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch jobs from backend once
  useEffect(() => {
    fetch("http://localhost:5063/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Jobs fetched for home:", data);
        setJobs(data);

        // ✅ Set random 3 trending jobs only once
        const random = [...data].sort(() => Math.random() - 0.5).slice(0, 3);
        setTrendingJobs(random);
      })
      .catch((err) => console.error("❌ Error fetching jobs:", err));
  }, []);

  // ✅ Handle search (button or Enter)
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a job title or company name");
      return;
    }
    navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
  };

  // ✅ Sort jobs by newest
  const sortedJobs = [...jobs].sort((a, b) => b.id - a.id);

  // ✅ Get latest 3 jobs
  const latestJobs = sortedJobs.slice(0, 3);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Explore thousands of jobs from top companies worldwide</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // ✅ Enter support
          />
          <button onClick={handleSearch}>🔍 Search</button>
        </div>
      </section>

      {/* ✅ Trending Jobs - Random 3 (fixed not to change on search) */}
      <section className="trending-jobs">
        <h2>🔥 Trending Jobs</h2>
        <div className="jobs-grid">
          {trendingJobs.length > 0 ? (
            trendingJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>
                  {job.company} - {job.location}
                </p>
                <Link to={`/jobs/${job.id}`}>Apply Now</Link>
              </div>
            ))
          ) : (
            <p>No trending jobs available.</p>
          )}
        </div>
      </section>

      {/* ✅ Recent Jobs - Latest 3 */}
      <section className="recent-jobs">
        <h2>🕒 Recent Jobs</h2>
        <div className="jobs-grid">
          {latestJobs.length > 0 ? (
            latestJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>
                  {job.company} - {job.location}
                </p>
                <Link to={`/jobs/${job.id}`}>Apply Now</Link>
              </div>
            ))
          ) : (
            <p>No recent jobs available.</p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1️⃣ Create Profile</h3>
            <p>Sign up and complete your profile in minutes.</p>
          </div>
          <div className="step">
            <h3>2️⃣ Apply for Jobs</h3>
            <p>Browse and apply for jobs that match your skills.</p>
          </div>
          <div className="step">
            <h3>3️⃣ Get Hired</h3>
            <p>Start your dream career with top companies.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Job Seekers</h2>
          <p>Find your dream job today.</p>
          <Link to="/register" className="cta-btn">
            Get Started
          </Link>
        </div>
        <div className="cta-box">
          <h2>For Employers</h2>
          <p>Post jobs & hire top talent.</p>
          <Link to="/admin" className="cta-btn">
            Post a Job
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
