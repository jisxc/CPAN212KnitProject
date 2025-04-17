import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('authToken'); 

    if (!email || !token) {
      setError('Please log in to view your orders.');
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-orders/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        setError('Error fetching order history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Order History</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.paymentStatus}</p>
            <p><strong>Items:</strong> {order.cartItems.map(item => item.name).join(', ')}</p>
            <p><strong>Paid via:</strong> {order.paymentDetails.cardName}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '3% auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
    color: '#333',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default Profile;
