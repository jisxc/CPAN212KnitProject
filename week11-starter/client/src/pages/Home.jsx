import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [knits, setKnits] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKnits = async (searchQuery = "") => {
    try {
      setLoading(true);
      setError(null);

      const username = import.meta.env.VITE_RAVELRY_USERNAME;
      const password = import.meta.env.VITE_RAVELRY_PASSWORD;
      const credentials = btoa(`${username}:${password}`);

      const url = `${import.meta.env.VITE_SERVER_URL}api/knits${searchQuery ? `?query=${searchQuery}` : ""}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch knitting patterns.");
      }

      const data = await response.json();
      console.log("Raw API data: ", data);

      const filteredKnits = data.filter((pattern) => {
          const photo = pattern?.first_photo;
          return pattern?.name && photo;
      });

      console.log("Final Knit List: ", filteredKnits);

      setKnits(filteredKnits);
    } catch (err) {
      console.error("Error fetching knits:", err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnits();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchKnits(query);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#c6328d", textAlign: "left" }}>Patterns</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search patterns"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", width: "100%" }}
        />
        <button type="submit" style={{ padding: "10px", marginLeft: "10px" }}>
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {knits.map((knit, index) => {
            const photo = knit?.first_photo;
            const imageUrl =
              photo?.medium_url || photo?.small_url || photo?.square_url || "https://placehold.co/250x200?text=No+Image";

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
                <h3 style={{ color: "#6b4a30" }}>{knit.name}</h3>
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
                {knit.id ? (
                  <Link to={`/knits/${knit.id}`}>View Details</Link>
                ) : (
                  <p>Details Unavailable</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Homepage;
