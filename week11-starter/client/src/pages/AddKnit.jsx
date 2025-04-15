import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addKnit } from '../api/api';
import { searchYarns, searchPatterns } from '../api/ravelry';

const AddKnit = () => {
  const navigate = useNavigate();
  const [knitData, setKnitData] = useState({
    yarn: '',
    pattern: '',
    projectName: '',
  });

  const [yarnSearch, setYarnSearch] = useState('');
  const [patternSearch, setPatternSearch] = useState('');
  const [yarnResults, setYarnResults] = useState([]);
  const [patternResults, setPatternResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleKnitSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addKnit(knitData);
      if (response.status === 200) {
        alert('Knit added successfully!');
        navigate('/knits');
      } else {
        alert('Error adding knit');
      }
    } catch (error) {
      console.error('Error adding knit:', error);
      alert('An error occurred while adding the knit.');
    } finally {
      setLoading(false);
    }
  };

  const handleYarnSearch = async () => {
    try {
      const response = await searchYarns(yarnSearch);
      setYarnResults(response.data.yarns || []);
    } catch (error) {
      console.error('Error searching yarn:', error);
    }
  };

  const handlePatternSearch = async () => {
    try {
      const response = await searchPatterns(patternSearch);
      setPatternResults(response.data.patterns || []);
    } catch (error) {
      console.error('Error searching patterns:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Knit</h2>
      <form onSubmit={handleKnitSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="projectName" style={styles.label}>Project Name</label>
          <input
            id="projectName"
            type="text"
            value={knitData.projectName}
            onChange={(e) => setKnitData({ ...knitData, projectName: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label htmlFor="yarn" style={styles.label}>Yarn</label>
          <input
            id="yarn"
            type="text"
            value={knitData.yarn}
            onChange={(e) => setKnitData({ ...knitData, yarn: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label htmlFor="pattern" style={styles.label}>Pattern</label>
          <input
            id="pattern"
            type="text"
            value={knitData.pattern}
            onChange={(e) => setKnitData({ ...knitData, pattern: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Adding...' : 'Add Knit'}
        </button>
      </form>

      <div style={styles.searchSection}>
        <div style={styles.searchBox}>
          <h3 style={{ color: '#c6328d' }}>Search Yarns</h3>
          <input
            type="text"
            value={yarnSearch}
            onChange={(e) => setYarnSearch(e.target.value)}
            placeholder="Search yarns"
            style={styles.input}
          />
          <button onClick={handleYarnSearch} style={{ ...styles.button, marginTop: '8px' }}>
            Search
          </button>
        </div>

        <div style={styles.searchBox}>
          <h3 style={{ color: '#c6328d' }}>Search Patterns</h3>
          <input
            type="text"
            value={patternSearch}
            onChange={(e) => setPatternSearch(e.target.value)}
            placeholder="Search patterns"
            style={styles.input}
          />
          <button onClick={handlePatternSearch} style={{ ...styles.button, marginTop: '8px' }}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '3% auto',
    padding: '20px',
    backgroundColor: '#1c2841',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    color: 'white',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
    color: '#c6328d',
  },
  error: {
    color: 'red',
    marginBottom: '16px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#181730',
    color: '#c6328d',
    padding: '12px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  searchSection: {
    marginTop: '30px',
  },
  searchBox: {
    marginBottom: '20px',
  },
};

export default AddKnit;
