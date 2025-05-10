import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const isAuthenticated = email;
  const username = email ? email.split('@')[0] : '';

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/login");
  };

  return (
    <header className="navigation">
      <h1 className="brand-title">Knitting</h1>
      <nav className="nav-container">
        <div className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/discovery">Discovery</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/aboutus">About Us</Link> 
          <Link to="/contactus">Contact Us</Link> 
        </div>

        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <Link to="/profile" style={{ marginRight: "10px", fontWeight: "bold", color: "#c6328d" }}>
                Hello, {username}!
              </Link>
              <Link to="/cart">Cart</Link> 
              <Link to="/checkout">Checkout</Link>
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
