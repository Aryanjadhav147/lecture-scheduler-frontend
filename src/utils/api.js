import axios from 'axios';

// 1. We use the REACT_APP_ prefix because your package.json confirms you are using Create React App (CRA).
// 2. This code reads the environment variable set in your .env file or deployment platform.
// 3. It falls back to the localhost URL for development if the variable is not found.
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'; 

const api = axios.create({
  // This will resolve to 'https://lecture-scheduler-backend-production-5328.up.railway.app/api'
  // when deployed, and 'http://localhost:8080/api' when running locally.
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = token;
  return config;
});

export default api;