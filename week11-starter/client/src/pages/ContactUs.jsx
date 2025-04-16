import React, { useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real-world app, you would send the form data to the server here
    console.log({ name, email, message });
    setIsSubmitted(true); // Show the confirmation message
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#c6328d", textAlign: "center" }}>Contact Us</h2>

      {isSubmitted ? (
        <p style={{ textAlign: "center", color: "#6b4a30" }}>
          Thank you for your message! We will get back to you as soon as possible.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="name" style={{ display: "block", color: "#6b4a30" }}>Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #ddd" }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ display: "block", color: "#6b4a30" }}>Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #ddd" }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="message" style={{ display: "block", color: "#6b4a30" }}>Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #ddd" }}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#181730",
              color: "#c6328d",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
