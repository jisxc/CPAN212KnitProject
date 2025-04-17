import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError(null);

      const username = import.meta.env.VITE_RAVELRY_USERNAME;
      const password = import.meta.env.VITE_RAVELRY_PASSWORD;
      const credentials = btoa(`${username}:${password}`);

      const url = `${import.meta.env.VITE_SERVER_URL}api/knits`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch knitting patterns.");
      }

      const data = await response.json();
      console.log("Fetched Knits for Sales:", data);

      // Filter for patterns with discounted prices
      const discounted = data.filter((pattern) => {
        return pattern?.pattern_sources?.some((source) => {
          const price = parseFloat(source?.price);
          const discount = parseFloat(source?.discount_price);
          return !isNaN(price) && !isNaN(discount) && discount < price;
        });
      });

      setSales(discounted);
    } catch (err) {
      console.error("Error fetching sales:", err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ color: "#d9534f", textAlign: "center" }}> On Sale Patterns</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : sales.length === 0 ? (
        <p>No discounted patterns found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {sales.map((knit, index) => {
            const photo = knit?.first_photo;
            const imageUrl =
              photo?.medium_url || photo?.small_url || "https://placehold.co/250x200?text=No+Image";

            const sourceWithDiscount = knit.pattern_sources.find((s) => {
              const price = parseFloat(s?.price);
              const discount = parseFloat(s?.discount_price);
              return !isNaN(price) && !isNaN(discount) && discount < price;
            });

            const originalPrice = parseFloat(sourceWithDiscount?.price).toFixed(2);
            const discountPrice = parseFloat(sourceWithDiscount?.discount_price).toFixed(2);

            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <img
                  src={imageUrl}
                  alt={knit.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <h3 style={{ color: "#5a2a83" }}>{knit.name}</h3>
                <p>
                  <strong>Price:</strong>{" "}
                  <span style={{ textDecoration: "line-through", color: "gray" }}>
                    ${originalPrice}
                  </span>{" "}
                  <span style={{ color: "green", fontWeight: "bold" }}>${discountPrice}</span>
                </p>
                <Link to={`/knits/${knit.id}`}>View Details</Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SalesPage;
