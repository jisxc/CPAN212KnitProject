import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#c6328d", textAlign: "center" }}>About Us</h2>
      <p style={{ textAlign: "center" }}>
        Welcome to our knitting community! We aim to provide a platform for knitters to discover beautiful patterns, share their own creations, and connect with other yarn enthusiasts.
      </p>
      
      <h3 style={{ color: "#6b4a30" }}>Our Mission</h3>
      <p>
        Our mission is to make knitting accessible to everyone, whether you're a beginner or an experienced knitter. We want to create a space where knitters can find inspiration, tools, and patterns to help them bring their creative visions to life.
      </p>

      <h3 style={{ color: "#6b4a30" }}>Why Choose Us?</h3>
      <ul>
        <li>Access to a wide variety of knitting patterns for all skill levels</li>
        <li>Easy-to-follow instructions and images for each pattern</li>
        <li>A vibrant community to share, learn, and grow with</li>
      </ul>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to="/" style={{ color: "#c6328d" }}>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
