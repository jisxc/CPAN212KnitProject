import axios from 'axios';

// Load base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Basic Auth header generator for Ravelry or backend if needed
const getBasicAuthHeader = () => {
  const username = import.meta.env.VITE_RAVELRY_USERNAME;
  const password = import.meta.env.VITE_RAVELRY_PASSWORD;
  return 'Basic ' + btoa(`${username}:${password}`);
};

// Add a new knit pattern (to your backend)
export const addKnit = async (knitData) => {
  const basicAuth = getBasicAuthHeader();

  return await axios.post(`${API_URL}/knits`, knitData, {
    headers: {
      Authorization: basicAuth,
      'Content-Type': 'application/json',
    },
  });
};

// User login (custom backend)
export const login = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
