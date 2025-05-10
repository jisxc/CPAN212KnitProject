
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const categories = ["sweater", "hat", "accesorie", "blanket", "pet"];

const Discovery = () => {
  const [patternsByCategory, setPatternsByCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryPatterns = async (category) => {
    try {
      const username = import.meta.env.VITE_RAVELRY_USERNAME;
      const password = import.meta.env.VITE_RAVELRY_PASSWORD;
      const credentials = btoa(`${username}:${password}`);

      const url = `${import.meta.env.VITE_SERVER_URL}api/knits?query=${category}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      const filtered = data.filter(
        (pattern) => pattern?.name && pattern?.first_photo
      );

      return filtered;
    } catch (err) {
      console.error(`Error fetching ${category}:`, err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = {};

        for (const category of categories) {
          const data = await fetchCategoryPatterns(category);
          results[category] = data;
        }

        setPatternsByCategory(results);
      } catch (err) {
        setError("Something went wrong loading the patterns.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", color: "#c6328d" }}>Discover Patterns</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading &&
        !error &&
        categories.map((category) => (
          <div key={category} style={{ marginBottom: "40px" }}>
            <h3 style={{ textTransform: "capitalize", color: "#6b4a30" }}>
              {category}s
            </h3>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "15px",
                padding: "10px 0",
              }}
            >
              {patternsByCategory[category]?.map((knit, index) => {
                const photo = knit?.first_photo;
                const imageUrl =
                  photo?.medium_url ||
                  photo?.small_url ||
                  photo?.square_url ||
                  "https://placehold.co/200x150?text=No+Image";

                return (
                  <div
                    key={index}
                    style={{
                      minWidth: "200px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={knit.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <h4>{knit.name}</h4>
                    {knit.id ? (
                      <Link to={`/knits/${knit.id}`}>View Details</Link>
                    ) : (
                      <p>Details Unavailable</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Discovery;
