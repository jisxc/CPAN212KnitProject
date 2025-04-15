import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); 
  const password = localStorage.getItem("password");
  
  const isAuthenticated = username && password;

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password"); 
    navigate("/"); 
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
              <span>Hello, {username}!</span>
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
