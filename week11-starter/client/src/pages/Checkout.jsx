import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceObj = item.pattern_sources?.find((s) => s?.price != null);
    const price = priceObj ? parseFloat(priceObj.price) : 0;
    return sum + price;
  }, 0);

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const isCardNumberValid = (number) => {
    const regex = /^\d{16}$/; 
    return regex.test(number);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email"); 

    if (!email) {
      alert("Please log in to place your order.");
      return;
    }

    const { name, number, expiry, cvv } = paymentDetails;

    if (!name || !number || !expiry || !cvv) {
      alert("Please complete all payment fields.");
      return;
    }

    if (!isCardNumberValid(number)) {
      alert("Invalid card number format.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/orders/add-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          cartItems,
          cardName: name,
          cardNumber: number,
          expiryDate: expiry,
          cvv,
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (!response.ok) {
        alert("Server error: " + (data.message || "Order saving failed"));
        return;
      }

      alert("Order placed successfully!");
      navigate("/profile");  
    } catch (error) {
      console.error("Error details:", error);  
      alert("Error placing order: " + error.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2 style={{ color: "#c6328d" }}>Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "30px",
      }}
    >
      {/* LEFT - CART ITEMS */}
      <div style={{ flex: 1 }}>
        <h2 style={{ color: "#c6328d", marginBottom: "20px" }}>Your Items</h2>

        {cartItems.map((item) => {
          const photo = item?.first_photo;
          const imageUrl =
            photo?.medium_url ||
            photo?.small_url ||
            photo?.square_url ||
            "https://placehold.co/250x200?text=No+Image";
          const priceObj = item.pattern_sources?.find((s) => s?.price != null);
          const price = priceObj
            ? `$${parseFloat(priceObj.price).toFixed(2)}`
            : item.free
            ? "Free"
            : "Paid";

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "15px",
                marginBottom: "15px",
              }}
            >
              <img
                src={imageUrl}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: "0 0 5px" }}>{item.name}</h4>
                <p style={{ margin: 0 }}>
                  <strong>Price:</strong> {price}
                </p>
              </div>
            </div>
          );
        })}

        <p style={{ fontWeight: "bold", marginTop: "10px" }}>
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>

      {/* RIGHT - PAYMENT FORM */}
      <div style={{ flex: 1 }}>
        <h2 style={{ color: "#c6328d", marginBottom: "20px" }}>
          Payment Details
        </h2>
        <form
          onSubmit={handleOrder}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            value={paymentDetails.name}
            onChange={handlePaymentChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            value={paymentDetails.number}
            onChange={handlePaymentChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="expiry"
            placeholder="Expiry Date (MM/YY)"
            value={paymentDetails.expiry}
            onChange={handlePaymentChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handlePaymentChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#c6328d",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

export default Checkout;
