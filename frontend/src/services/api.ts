const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed', code: 'UNKNOWN' }));
    
    // Handle authentication errors gracefully
    if (response.status === 401 || response.status === 403) {
      // Clear invalid token
      if (error.code === 'TOKEN_EXPIRED' || error.code === 'INVALID_TOKEN' || error.code === 'TOKEN_ERROR') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Don't throw error for auth endpoints
        if (!endpoint.includes('/auth/')) {
          throw new Error(error.error || 'Session expired. Please login again.');
        }
      }
    }
    
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  register: async (name: string, email: string, password: string, rollNumber: string) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, rollNumber }),
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },

  isAuthenticated: () => {
    return !!getToken();
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// Bookings API
export const bookingsAPI = {
  getAll: async () => {
    return apiRequest('/bookings');
  },

  create: async (booking: {
    name: string;
    rollNumber: string;
    facility: string;
    date: string;
    timeSlot: string;
    purpose: string;
  }) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  },

  getById: async (id: number) => {
    return apiRequest(`/bookings/${id}`);
  },
};

// Events API
export const eventsAPI = {
  getAll: async (club?: string) => {
    const url = club ? `/events?club=${club}` : '/events';
    return apiRequest(url);
  },

  getById: async (id: number) => {
    return apiRequest(`/events/${id}`);
  },

  register: async (eventId: number, name: string, rollNumber: string) => {
    return apiRequest(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify({ name, rollNumber }),
    });
  },
};

// Clubs API
export const clubsAPI = {
  getAll: async () => {
    return apiRequest('/clubs');
  },

  getTeam: async (club: string) => {
    return apiRequest(`/clubs/${club}/team`);
  },
};

// Admin API
export const adminAPI = {
  getStats: async () => {
    return apiRequest('/admin/stats');
  },

  getBookings: async () => {
    return apiRequest('/admin/bookings');
  },

  approveBooking: async (id: number) => {
    return apiRequest(`/admin/bookings/${id}/approve`, {
      method: 'PATCH',
    });
  },

  rejectBooking: async (id: number) => {
    return apiRequest(`/admin/bookings/${id}/reject`, {
      method: 'PATCH',
    });
  },

  getRegistrations: async (limit?: number) => {
    const url = limit ? `/admin/registrations?limit=${limit}` : '/admin/registrations';
    return apiRequest(url);
  },
};

