import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceObj = item.pattern_sources?.find((s) => s?.price != null);
    const price = priceObj ? parseFloat(priceObj.price) : 0;
    return sum + price;
  }, 0);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2 style={{ color: "#c6328d" }}>Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#c6328d", textAlign: "center", marginBottom: "20px" }}>Check Out</h2>

      {cartItems.map((item) => {
        const photo = item?.first_photo;
        const imageUrl =
          photo?.medium_url || photo?.small_url || photo?.square_url || "https://placehold.co/250x200?text=No+Image";
        const priceObj = item.pattern_sources?.find((s) => s?.price != null);
        const price = priceObj ? `$${parseFloat(priceObj.price).toFixed(2)}` : item.free ? "Free" : "Paid";

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
              style={{ width: "120px", height: "90px", objectFit: "cover", borderRadius: "6px" }}
            />
            <div style={{ flexGrow: 1 }}>
              <h4 style={{ margin: "0 0 5px" }}>{item.name}</h4>
              <p style={{ margin: 0 }}>
                <strong>Price:</strong> {price}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              style={{
                background: "transparent",
                color: "#c6328d",
                border: "1px solid #c6328d",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#c6328d";  
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";  
                e.target.style.color = "#c6328d";  /
              }}
            >
              Remove
            </button>
          </div>
        );
      })}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/cart")}
          style={{
            padding: "10px 25px",
            backgroundColor: "transparent",
            color: "#c6328d",
            border: "1px solid #c6328d",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#c6328d";  
            e.target.style.color = "#fff";  
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";  
            e.target.style.color = "#c6328d"; 
          }}
        >
          Back to Cart
        </button>

        <button
          style={{
            padding: "10px 25px",
            backgroundColor: "#c6328d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
