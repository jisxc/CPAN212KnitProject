import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemDetails = () => {
  const { id } = useParams();
  const [knit, setKnit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log("Fetched Knit Details: ", data);
        setKnit(data);
      } catch (err) {
        console.error("Error fetching knit details:", err);
        setError("Something went wrong. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    console.log(`Fetching details for knit with ID: ${id}`);

    fetchKnitDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!knit) return <p>No details found.</p>;

  const photo = knit?.first_photo;
  const imageUrl =
    photo?.medium_url || photo?.small_url || photo?.square_url || "https://placehold.co/250x200?text=No+Image";

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <img
        src={imageUrl}
        alt={knit.name}
        style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }}
      />
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
        <strong>Craft:</strong> {knit.craft}
      </p>
      <p>
        <strong>Published:</strong> {knit.published}
      </p>
      <p>
        <strong>Yarn Weight:</strong> {knit.yarn_weight}
      </p>
      <p>
        <strong>Pattern Type:</strong> {knit.pattern_type}
      </p>
      <p>
        <strong>Description:</strong> {knit.description || "No description available."}
      </p>
    </div>
  );
};

export default ItemDetails;
