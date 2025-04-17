import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Fetch the wishlist from localStorage when the component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const handleAddToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    storedCart.push(item);
    localStorage.setItem("cartItems", JSON.stringify(storedCart));
  };

  const handleProceedToCart = () => {
    navigate("/cart");
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2
        style={{ color: "#c6328d", textAlign: "center", marginBottom: "20px" }}
      >
        Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlist.map((item) => (
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
                src={
                  item.first_photo?.medium_url || "https://placehold.co/100x100"
                }
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginRight: "20px",
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>
                  <Link 
                    to={`/knits/${item.id}`}
                    style={{ textDecoration: "none", color: "#c6328d"}}
                    >
                      {item.name}
                    </Link>
                </h4>
                <p>
                  <strong>Price:</strong>{" "}
                  {(() => {
                    const sourceWithPrice = item?.pattern_sources?.find(
                      (s) => s?.price != null
                    );
                    if (sourceWithPrice?.price != null) {
                      return `$${parseFloat(sourceWithPrice.price).toFixed(2)}`;
                    }

                    // Fallback: try to extract full price from the notes string (e.g., "$14.00 CAD")
                    const notes = item?.notes || "";
                    const priceMatch = notes.match(/\$([\d.]+)\s*CAD/i);
                    if (priceMatch) {
                      return `$${priceMatch[1]} CAD`;
                    }

                    return item?.free ? "Free" : "Paid";
                  })()}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  onClick={() => handleAddToCart(item)}
                  style={{
                    backgroundColor: "#c6328d", // Pink background
                    color: "#fff", // White text
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "8px 15px",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                    marginBottom: "10px", // Space between the buttons
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ff4081")
                  } // Hover effect
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#c6328d")
                  }
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  style={{
                    backgroundColor: "transparent", // Transparent background
                    color: "#c6328d", // Pink text color
                    border: "1px solid #c6328d", // Pink border
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "8px 15px",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#c6328d"; // Hover background color
                    e.target.style.color = "#fff"; // Hover text color (white)
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent"; // Revert to transparent
                    e.target.style.color = "#c6328d"; // Revert to pink text color
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => navigate("/discovery")}
          style={{
            padding: "10px 25px",
            backgroundColor: "transparent",
            color: "#c6328d",
            border: "1px solid #c6328d",
            borderRadius: "5px",
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
          Back to Discovery Page
        </button>

        <button
          onClick={handleProceedToCart}
          style={{
            padding: "10px 25px",
            backgroundColor: "#c6328d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Proceed to Cart
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
