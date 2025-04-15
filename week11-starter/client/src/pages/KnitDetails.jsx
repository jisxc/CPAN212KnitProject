import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const KnitDetail = () => {
  const navigate = useNavigate();
  const [knit, setKnit] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.userId);
    }

    const fetchKnitDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/knits/details/${id}`);
        const data = await response.json();
        setKnit(data);
      } catch (error) {
        console.error("Error fetching knit details:", error);
      }
    };

    fetchKnitDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this knit?")) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/knits/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Knit deleted successfully!");
        navigate("/knits");
      } else {
        alert("Failed to delete the knit.");
      }
    } catch (error) {
      console.error("Error deleting the knit:", error);
    }
  };

  if (!knit) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{knit.patternName}</h2>
      <p><strong>Designer:</strong> {knit.designer}</p>
      <p><strong>Yarns:</strong> {knit.yarns.join(", ")}</p>
      <p><strong>Techniques:</strong> {knit.techniques.join(", ")}</p>

      {isAuthenticated && knit.created_by_user === userId && (
        <div style={styles.actions}>
          <Link to={`/knits/edit/${id}`} style={styles.editBtn}>Edit</Link>
          <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f4f1ea",
  },
  heading: {
    color: "#6b4a30",
    fontSize: "2rem",
    borderBottom: "2px solid #6b4a30",
    display: "inline-block",
    marginBottom: "20px",
  },
  actions: {
    marginTop: "20px",
  },
  editBtn: {
    padding: "10px 20px",
    backgroundColor: "#c49d68",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    marginRight: "10px",
  },
  deleteBtn: {
    padding: "10px 20px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default KnitDetail;
