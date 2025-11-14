import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Auth.css"; // ✅ Import CSS
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("https://job-portal-backend-rqau.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => alert("Registration successful!"));
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
}

export default Register;
