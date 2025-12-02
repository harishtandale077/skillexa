import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('skillforge_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('skillforge_token');
      localStorage.removeItem('skillforge_user');
      // Don't redirect automatically, let the app handle it
      console.warn('Authentication expired');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh'),
};

// Skills API
export const skillsAPI = {
  getAll: (params) => api.get('/skills', { params }),
  getById: (id) => api.get(`/skills/${id}`),
  enroll: (id) => api.post(`/skills/${id}/enroll`),
  updateProgress: (id, data) => api.patch(`/skills/${id}/progress`, data),
  getEnrolled: () => api.get('/skills/user/enrolled'),
};

// Exams API
export const examsAPI = {
  create: (examData) => api.post('/exams', examData),
  getAll: (params) => api.get('/exams', { params }),
  getById: (id) => api.get(`/exams/${id}`),
  submit: (id, answers) => api.post(`/exams/${id}/submit`, { answers }),
  getResults: (id) => api.get(`/exams/${id}/results`),
  getUserExams: () => api.get('/exams/user'),
};

// Users API
export const usersAPI = {
  updateProfile: (data) => api.patch('/users/profile', data),
  changePassword: (data) => api.patch('/users/password', data),
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getStats: () => api.get('/users/stats'),
};

// Certificates API
export const certificatesAPI = {
  getAll: (params) => api.get('/certificates', { params }),
  getById: (id) => api.get(`/certificates/${id}`),
  download: (id) => api.get(`/certificates/${id}/download`, { responseType: 'blob' }),
  verify: (credentialId) => api.get(`/certificates/verify/${credentialId}`),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getPerformance: (params) => api.get('/analytics/performance', { params }),
  getSkillProgress: () => api.get('/analytics/skills'),
  getLeaderboard: (params) => api.get('/analytics/leaderboard', { params }),
};

export default api;