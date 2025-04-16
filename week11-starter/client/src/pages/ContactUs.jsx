import React, { useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
    setIsSubmitted(true); 
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2
        style={{ color: "#c6328d", textAlign: "center", marginBottom: "20px" }}
      >
        Contact Us
      </h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        We would love to hear from you! <br />
        Please feel free to reach out to us by filling out the form below.
      </p>

      {isSubmitted ? (
        <p style={{ textAlign: "center", color: "#6b4a30" }}>
          Thank you for your message! <br />
          We will get back to you as soon as possible.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ padding: "25px", maxWidth: "600px", margin: "0 auto" }}
        >
          <div>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
              required
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
              required
            />
          </div>

          <div>
            <textarea
              id="message"
              placeholder="Your message here!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
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
              width: "auto", 
              display: "block",
              margin: "0 auto", 
              fontSize: "16px",
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
