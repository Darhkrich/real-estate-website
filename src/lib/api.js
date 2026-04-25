const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const MOCK_AUTH = process.env.NEXT_PUBLIC_MOCK_AUTH === 'true';

// Mock data for testing
const MOCK_PROPERTIES = [
  { id: 1, title: 'Luxury Penthouse', price: 2500000, status: 'buy', agent_name: 'Admin User', slug: 'luxury-penthouse', images: [{ url: 'https://images.unsplash.com/photo-1600596542815-27b88e57e62f?w=400' }] },
  { id: 2, title: 'Beachfront Villa', price: 15000, status: 'rent', agent_name: 'Admin User', slug: 'beachfront-villa', images: [{ url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400' }] },
];

const MOCK_AGENTS = [
  { id: 1, name: 'Alexander Sterling', title: 'Senior Broker', email: 'alex@primeestate.com', phone: '+12125550199', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200', listing_count: 5 },
  { id: 2, name: 'Elena Rostova', title: 'Director', email: 'elena@primeestate.com', phone: '+13055550144', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200', listing_count: 3 },
];

const MOCK_STATS = { properties: 8, views: 1247, inquiries: 12, agents: 4, portfolio_value: 18500000 };

export const api = {
  async request(endpoint, options = {}) {
    if (MOCK_AUTH) {
      return this.mockRequest(endpoint, options);
    }
    const token = localStorage.getItem('access_token');
    const headers = { ...options.headers };
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    if (response.status === 401) {
      localStorage.removeItem('access_token'); localStorage.removeItem('refresh_token'); localStorage.removeItem('user');
      window.location.href = '/admin/login'; throw new Error('Unauthorized');
    }
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'API request failed');
    }
    return response.status !== 204 ? response.json() : null;
  },

  mockRequest(endpoint, options) {
    // Simulate async delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const method = options?.method || 'GET';
        if (endpoint === '/auth/login/') {
          resolve({ access: 'mock', refresh: 'mock', user: { id: 'admin-001', name: 'Admin User', email: 'admin@primeestate.com', role: 'admin' } });
        } else if (endpoint === '/admin/stats/') {
          resolve(MOCK_STATS);
        } else if (endpoint === '/properties/' || endpoint === '/properties/my-listings/') {
          resolve(MOCK_PROPERTIES);
        } else if (endpoint.startsWith('/properties/') && method === 'DELETE') {
          resolve(null);
        } else if (endpoint === '/agents/') {
          resolve(MOCK_AGENTS);
        } else if (endpoint.startsWith('/agents/') && method === 'DELETE') {
          resolve(null);
        } else if (endpoint === '/inquiries/') {
          resolve([{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '123', subject: 'Property inquiry', status: 'unread', created_at: new Date().toISOString() }]);
        } else {
          resolve({});
        }
      }, 300);
    });
  },

  get: (endpoint) => api.request(endpoint, { method: 'GET' }),
  post: (endpoint, data) => api.request(endpoint, { method: 'POST', body: data instanceof FormData ? data : JSON.stringify(data) }),
  put: (endpoint, data) => api.request(endpoint, { method: 'PUT', body: data instanceof FormData ? data : JSON.stringify(data) }),
  patch: (endpoint, data) => api.request(endpoint, { method: 'PATCH', body: data instanceof FormData ? data : JSON.stringify(data) }),
  delete: (endpoint) => api.request(endpoint, { method: 'DELETE' }),
};