import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [knits, setKnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKnits = async () => {
      try {
        const username = import.meta.env.VITE_RAVELRY_USERNAME;
        const password = import.meta.env.VITE_RAVELRY_PASSWORD;
        const credentials = btoa(`${username}:${password}`);

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/knits`, {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch knits.`);
        }

        const data = await response.json();

        console.log("Fetched Knits Data: ", data);

        const filteredKnits = Object.values(data).filter((pattern) => {
          const firstPhoto = pattern?.photos?.[0];

          console.log("Pattern Name: ", pattern?.name);
          console.log("Photo Object: ", firstPhoto);

          // Only require name and *some photo*, ignore price for now
          return pattern?.name && firstPhoto;
        });

        setKnits(filteredKnits.slice(0, 5)); // Only show the first 5 knits
        console.log("Filtered Knits: ", filteredKnits);
      } catch (err) {
        console.error("Error fetching knits:", err);
        setError("Failed to fetch knits. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchKnits();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Featured Knitting Patterns:</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <div style={styles.knitList}>
          {knits.length > 0 ? (
            knits.map((knit, index) => {
              const photo = knit?.photos?.[0];
              const imageUrl =
                photo?.medium_url || photo?.small_url || photo?.square_url;

              return (
                <div key={index} style={styles.knitCard}>
                  <img
                    src={
                      imageUrl ||
                      "https://via.placeholder.com/250x200?text=No+Image"
                    }
                    alt={knit.name}
                    style={styles.image}
                  />
                  <h3 style={styles.knitTitle}>{knit.name}</h3>
                  <p>
                    <strong>Price:</strong>{" "}
                    {knit.price ? `$${knit.price.toFixed(2)}` : "Free"}
                  </p>
                  <Link
                    to={`/knits/${knit.id || index}`}
                    style={styles.detailsLink}
                  >
                    View Details
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No knits available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    color: "#c6328d",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  knitList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  knitCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  knitTitle: {
    fontSize: "1.5rem",
    color: "#6b4a30",
    margin: "10px 0",
  },
  detailsLink: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#c49d68",
    color: "#f4f1ea",
    textDecoration: "none",
    borderRadius: "5px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center", 
  },
};


export default Homepage;

