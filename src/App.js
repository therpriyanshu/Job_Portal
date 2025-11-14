import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import UserDashoard from "./pages/UserDashoard";
import AdminDashboard from "./pages/AdminDashboard";
import AddJob from "./pages/AddJob";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/addjob" element={<AddJob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdash" element={<UserDashoard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </>
  );
}

export default App;
