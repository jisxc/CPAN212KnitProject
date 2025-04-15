import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  // Get the user email from localStorage (used for logged-in user identification)
  const email = localStorage.getItem("email"); 

  const isAuthenticated = email; // If email exists, user is logged in

  const handleLogout = () => {
    localStorage.removeItem("email"); // Remove email (and password, if needed)
    localStorage.removeItem("password"); // You can remove password if you're using it
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <header className="navigation">
      <h1 className="brand-title">Knitting</h1>
      <nav className="nav-container">
        <div className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/knits">All Knits</Link>
          <Link to="/knits/add">Add Knit</Link>
        </div>

        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <span>Hello, {email}!</span> {/* Display "Welcome, [User]" */}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
