import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditKnit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [knitData, setKnitData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKnit = async () => {
      try {
        const response = await fetch(`/api/knits/${id}`);
        if (!response.ok) throw new Error("Knit not found.");
        const data = await response.json();
        setKnitData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching knit:', error);
        alert('Failed to load knit data.');
      }
    };

    fetchKnit();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKnitData({
      ...knitData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/knits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(knitData),
      });

      if (response.ok) {
        alert('Knit updated successfully!');
        navigate('/knits');
      } else {
        alert('Failed to update knit.');
      }
    } catch (error) {
      console.error('Error updating knit:', error);
      alert('An error occurred while updating the knit.');
    }
  };

  if (loading) {
    return <p style={styles.loadingText}>Loading...</p>;
  }

  return (
    <div style={styles.editKnit}>
      <h2 style={styles.heading}>Edit Knit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={knitData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          style={styles.input}
          required
        />
        <textarea
          name="description"
          value={knitData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          style={styles.textarea}
          required
        />
        <input
          type="text"
          name="image"
          value={knitData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          style={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          value={knitData.price}
          onChange={handleChange}
          placeholder="Enter price"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Update Knit</button>
      </form>
    </div>
  );
};

const styles = {
  editKnit: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    width: '100%',
  },
  textarea: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    width: '100%',
    height: '120px',
    resize: 'vertical',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  }
};

export default EditKnit;
