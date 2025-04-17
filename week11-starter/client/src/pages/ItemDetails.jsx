import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [knit, setKnit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchKnitDetails = async () => {
      try {
        const username = import.meta.env.VITE_RAVELRY_USERNAME;
        const password = import.meta.env.VITE_RAVELRY_PASSWORD;
        const credentials = btoa(`${username}:${password}`);

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/knits/${id}`, {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch pattern details.");
        }

        const data = await response.json();

        console.log("Full Knit Data:", data);
        console.log("Photos Found: ", data.photos)
        console.log("First Photo:", data.first_photo);

        setKnit(data);

        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsWishlisted(storedWishlist.some((item) => item.id === data.id));
      } catch (err) {
        console.error("Error fetching knit details:", err);
        setError("Something went wrong. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchKnitDetails();
  }, [id]);

  const handleAddToCart = () => {
    const currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedItems = [...currentItems, knit];
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    navigate("/cart");
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let updatedWishlist;
    if (isWishlisted) {
      updatedWishlist = wishlist.filter((item) => item.id !== knit.id);
    } else {
      updatedWishlist = [...wishlist, knit];
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(!isWishlisted);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!knit) return <p>No details found.</p>;

  const photo = knit?.first_photo;
  const imageUrl =
    (photo?.medium_url || photo?.small_url || photo?.square_url) || "https://placehold.co/250x200?text=No+Image";

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt={knit.name || "No Image"}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          loading="lazy"
        />
        <button
          onClick={toggleWishlist}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "24px",
            color: isWishlisted ? "#ff4081" : "#999",
            cursor: "pointer",
          }}
        >
          {isWishlisted ? "💖" : "🤍"}
        </button>
      </div>

      <h2 style={{ color: "#c6328d", marginTop: "20px" }}>{knit.name}</h2>
      <p>
        <strong>Price:</strong>{" "}
        {(() => {
          const sourceWithPrice = knit?.pattern_sources?.find((s) => s?.price != null);
          if (sourceWithPrice?.price != null) {
            return `$${parseFloat(sourceWithPrice.price).toFixed(2)}`;
          }
          return knit?.free ? "Free" : "Paid";
        })()}
      </p>
      <p>
        <strong>Yarn Weight:</strong> {knit.yarn_weight?.name}
      </p>
      <div style={{ marginTop: "10px" }}>
      <strong>Description:</strong>
      <div
        style={{
          marginTop: "5px",
          maxHeight: "150px",
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
          border: "1px solid #ccc",
          whiteSpace: "pre-wrap",
        }}
      >
        {knit.notes || "No description available."}
      </div>
    </div>
    </div>
  );
};

export default ItemDetails;
