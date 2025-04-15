import axios from 'axios';

// Set up Ravelry API with Basic Auth
const ravelryApi = axios.create({
  baseURL: 'https://api.ravelry.com',
  headers: {
    'Authorization': `Basic ${btoa(
      `${import.meta.env.VITE_RAVELRY_USERNAME}:${import.meta.env.VITE_RAVELRY_PASSWORD}`
    )}`
  }
});

// Get logged-in user info from Ravelry
export const getCurrentUser = () => ravelryApi.get('/current_user.json');

// Search yarns
export const searchYarns = (query) =>
  ravelryApi.get('/yarns/search.json', { params: { query } });

// Search patterns
export const searchPatterns = (query) =>
  ravelryApi.get('/patterns/search.json', { params: { query } });


