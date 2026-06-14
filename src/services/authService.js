import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  // 1. Updated Signup to direct to the specific donor/facility routes
  signup: async (userData, role = 'donor') => {
    try {
      // Constructs '/api/auth/signup/donor' or '/api/auth/signup/hospital' (or facility)
      const endpoint = `/api/auth/signup/${role}`;
      const response = await api.post(endpoint, userData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Registration failed.'
      );
    }
  },

  
login: async (email, password) => {
    try {
HEAD
      const response = await api.post('/auth/login', {
  email,
  password,
});

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);

      
      const response = await api.post('/api/auth/token', {
        email: email,
        password: password
      });

      
      const token = typeof response.data === 'string' ? response.data : response.data.access_token;
 e8dceae (fix: implement state forms for donor and hospital signups and match authService to json token path)

      if (token) {
        localStorage.setItem('token', token);
        
        
        if (response.data.role) {
          localStorage.setItem('role', response.data.role);
        }
        if (response.data.user_id) {
          localStorage.setItem('user_id', response.data.user_id);
        }
      }

      return response.data;
    } catch (error) {
  
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const validationErrors = error.response.data.detail;
        console.error("Backend validation error details:", validationErrors);
        throw `Validation Error: ${validationErrors[0]?.msg || 'Invalid data layout'}`;
      }
      
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