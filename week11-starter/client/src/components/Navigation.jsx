import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  // Get the user username and authToken from localStorage (used for logged-in user identification)
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("authToken");

  const isAuthenticated = username && authToken; // If username and authToken exist, user is logged in

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove username
    localStorage.removeItem("authToken"); // Remove auth token for secure logout
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
              <span style={styles.welcomeMessage}>Hello, {username}!</span> {/* Display "Welcome, [User]" */}
              <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
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

// Add custom styles for smaller text and darker pink color with hover effects
const styles = {
  welcomeMessage: {
    fontSize: "0.9rem", // Smaller font size for the welcome message
    color: "#9c1d4d",  // Darker pink color
    marginRight: "10px",
  },
  logoutButton: {
    fontSize: "0.9rem", // Smaller font size for the logout button
    color: "#9c1d4d",  // Darker pink color
    background: "transparent", 
    border: "none", 
    cursor: "pointer",
    textDecoration: "underline",
  },
  link: {
    textDecoration: "none", 
    color: "#9c1d4d", 
  },
  linkHover: {
    textDecoration: "underline", 
  },
};

export default Navigation;
