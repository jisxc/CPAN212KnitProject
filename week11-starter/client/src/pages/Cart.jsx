import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return <p style={{ padding: "30px", textAlign: "center" }}>Your cart is empty.</p>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#c6328d", textAlign: "center", marginBottom: "20px" }}>Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
        >
          <img
            src={item?.first_photo?.small_url || "https://placehold.co/100x100"}
            alt={item.name}
            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px", marginRight: "20px" }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={{ margin: "5px 0" }}>
              <strong>Price:</strong>{" "}
              {(() => {
                const price = item?.pattern_sources?.find((s) => s?.price != null)?.price;
                return price ? `$${parseFloat(price).toFixed(2)}` : item?.free ? "Free" : "Paid";
              })()}
            </p>
          </div>
          <button
            onClick={() => handleRemove(item.id)}
            style={{
              background: "transparent",
              border: "1px solid #c6328d",
              color: "#c6328d",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/discovery")}
          style={{
            padding: "10px 25px",
            backgroundColor: "transparent",
            color: "#c6328d",
            border: "1px solid #c6328d",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Discovery Page
        </button>

        <button
          onClick={() => navigate("/checkout")}
          style={{
            padding: "10px 25px",
            backgroundColor: "#c6328d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
