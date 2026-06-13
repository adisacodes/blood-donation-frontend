import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  // Register Donor or Hospital
  signup: async (userData) => {
    try {
      const response = await api.post('/api/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Registration failed.'
      );
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', email); // FastAPI OAuth2 expects username
      formData.append('password', password);

      const response = await axios.post(
        `${API_URL}/api/auth/token`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);

        if (response.data.role) {
          localStorage.setItem('role', response.data.role);
        }

        if (response.data.user_id) {
          localStorage.setItem('user_id', response.data.user_id);
        }
      }

      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.detail ||
        'Invalid email or password.'
      );
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getRole: () => {
    return localStorage.getItem('role');
  },

  getUserId: () => {
    return localStorage.getItem('user_id');
  },
};

export default authService;