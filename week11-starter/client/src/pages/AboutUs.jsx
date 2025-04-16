import React from 'react';
import { Link } from 'react-router-dom';
import kailasImage from '../images/Kaila.png'; 
import ajsImage from '../images/Aji.jpg';

const AboutUs = () => {
  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#c6328d", textAlign: "center", marginBottom: "20px" }}>About Us</h2>
      <p style={{ textAlign: "center", marginBottom: "40px" }}>
        We are two students from Humber College, North Campus, enrolled in the Modern Web Technologies section (0ND). Our goal is to create a platform where knitters and crocheters can easily search for knitting patterns and share their creations with the community.
      </p>
      
      <h3 style={{ color: "#6b4a30", marginBottom: "20px" }}>Our Mission</h3>
      <p style={{ marginBottom: "40px" }}>
        Our mission is to make it easier for knitting and crochet enthusiasts to find inspiration, discover new patterns, and share their own creations. By connecting knitters and crocheters from all around the world, we hope to foster a community of creativity, learning, and collaboration.
      </p>

      <h3 style={{ color: "#6b4a30", marginBottom: "20px" }}>Why Choose Us?</h3>
      <ul style={{ listStyleType: "disc", paddingLeft: "40px", marginBottom: "40px" }}>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          A comprehensive collection of knitting and crochet patterns for all skill levels
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Simple, easy-to-follow instructions with images for each pattern
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          A supportive and vibrant community for sharing, learning, and growing
        </li>
      </ul>

      <h3 style={{ color: "#6b4a30", marginBottom: "20px" }}>Meet the Developers</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "40px" }}>
        {/* Developer 1 Profile */}
        <div style={{ textAlign: "center", width: "200px", border: "2px solid #c6328d", borderRadius: "8px", padding: "20px" }}>
          <div style={{ 
            width: "150px", 
            height: "150px", 
            borderRadius: "50%", 
            backgroundImage: `url(${kailasImage})`, 
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            margin: "0 auto" 
          }}></div>
          <h4 style={{ color: "#6b4a30", marginTop: "10px" }}>Kaila Paradis</h4>
          <p style={{ color: "#6b4a30" }}>Student #: N01659632</p>
        </div>

        {/* Developer 2 Profile */}
        <div style={{ textAlign: "center", width: "200px", border: "2px solid #c6328d", borderRadius: "8px", padding: "20px" }}>
          <div style={{
            width: "150px", 
            height: "150px", 
            borderRadius: "50%", 
            backgroundImage: `url(${ajsImage})`,
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            margin: "0 auto"
          }}></div>
          <h4 style={{ color: "#6b4a30", marginTop: "10px" }}>Aj Sia Cunco</h4>
          <p style={{ color: "#6b4a30" }}>Student #: N01611199</p>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/" style={{ color: "#c6328d", fontSize: "18px" }}>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
