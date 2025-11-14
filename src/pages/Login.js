import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Auth.css"; // ✅ Import CSS

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://job-portal-backend-rqau.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }

      const data = await response.json();
      alert("Login Successful!");

      // ✅ Store user details in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Redirect based on user role
      if (data.role === "Admin") {
        window.location.href = "/admindash";
      } else {
        window.location.href = "/userdash";
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
        <Link to="/register">Don't have an account? Register</Link>
      </form>
    </div>
  );
}

export default Login;
