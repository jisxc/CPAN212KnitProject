import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllKnits = () => {
  const [knits, setKnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchKnits = async () => {
      try {
        const response = await fetch('/api/knits');
        if (!response.ok) throw new Error('Failed to fetch knits');
        const data = await response.json();
        setKnits(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchKnits();
  }, []);

  if (loading) return <p>Loading knits...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="all-knits">
      <h2>All Knits</h2>
      {knits.length === 0 ? (
        <p>No knits available yet.</p>
      ) : (
        <div className="knit-list">
          {knits.map((knit) => (
            <div className="knit-card" key={knit.id}>
              <img
                src={knit.image || '/placeholder-image.jpg'}
                alt={knit.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              <h3>{knit.name}</h3>
              <p>{knit.description}</p>
              <Link to={`/knit/${knit.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllKnits;
