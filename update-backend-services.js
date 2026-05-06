const fs = require('fs');
const path = require('path');
const root = process.cwd();
const write = (rel, content) => fs.writeFileSync(path.join(root, rel), content, 'utf8');

write('src/services/authService.js', `const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const authTokenKey = 'authToken';

const getAuthHeaders = (hasBody = false) => {
  const headers = {};
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem(authTokenKey);
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  return headers;
};

const handleResponse = async (response) => {
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    return {
      success: false,
      message: (data && (data.message || data.error)) || response.statusText,
      ...data,
    };
  }

  return data || { success: true };
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  return handleResponse(response);
};

export const login = async (email, password) => {
  const result = await request('/auth/login', {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify({ email, password }),
  });

  if (result.success && result.token) {
    localStorage.setItem(authTokenKey, result.token);
  }

  return result;
};

export const register = async (userData) => {
  const result = await request('/auth/register', {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(userData),
  });

  if (result.success && result.token) {
    localStorage.setItem(authTokenKey, result.token);
  }

  return result;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem(authTokenKey);
  if (!token) {
    return null;
  }

  const result = await request('/auth/me', {
    headers: getAuthHeaders(),
  });

  if (!result.success || !result.user) {
    localStorage.removeItem(authTokenKey);
    return null;
  }

  return result.user;
};

export const logout = () => {
  localStorage.removeItem(authTokenKey);
};

export const updateWalletBalance = async (userId, amount) => {
  return request(`/users/${userId}/wallet`, {
    method: 'PATCH',
    headers: getAuthHeaders(true),
    body: JSON.stringify({ amount }),
  });
};

export const getAllUsers = async () => {
  return request('/users', {
    headers: getAuthHeaders(),
  });
};

export const toggleBlockUser = async (userId) => {
  return request(`/users/${userId}/block`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });
};
`);

write('src/services/ticketService.js', `const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const handleResponse = async (response) => {
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  if (!response.ok) {
    return {
      success: false,
      message: (data && (data.message || data.error)) || response.statusText,
      ...data,
    };
  }
  return data || { success: true };
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  return handleResponse(response);
};

export const uploadTicket = async (uploadData, ownerId, ownerName, ownerPhone) => {
  return request('/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...uploadData,
      ownerId,
      ownerName,
      ownerPhone,
    }),
  });
};

export const getAllTickets = async () => {
  return request('/tickets');
};

export const getPendingTickets = async () => {
  return request('/tickets/pending');
};

export const verifyTicket = async (ticketId, approve) => {
  return request(`/tickets/${ticketId}/verify`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ approve }),
  });
};

export const getAvailableTickets = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.source) params.append('source', filters.source);
  if (filters.destination) params.append('destination', filters.destination);
  if (filters.journeyDate) params.append('journeyDate', filters.journeyDate);
  if (filters.class) params.append('class', filters.class);
  return request(`/tickets/available?${params.toString()}`);
};

export const getTicketsByOwner = async (ownerId) => {
  return request(`/tickets/owner/${ownerId}`);
};

export const getTicketsByBuyer = async (buyerId) => {
  return request(`/tickets/buyer/${buyerId}`);
};

export const bookTicket = async (ticketId, buyerId, buyerName, buyerPhone, passengerDetails) => {
  return request(`/tickets/${ticketId}/book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ buyerId, buyerName, buyerPhone, passengerDetails }),
  });
};
`);

write('src/services/transactionService.js', `const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const handleResponse = async (response) => {
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  if (!response.ok) {
    return {
      success: false,
      message: (data && (data.message || data.error)) || response.statusText,
      ...data,
    };
  }
  return data || { success: true };
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  return handleResponse(response);
};

export const createTransaction = async (ticketId, ticketDetails, sellerId, sellerName, buyerId, buyerName, amount, paymentMethod) => {
  return request('/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticketId, ticketDetails, sellerId, sellerName, buyerId, buyerName, amount, paymentMethod }),
  });
};

export const completeTransaction = async (transactionId, success) => {
  return request(`/transactions/${transactionId}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ success }),
  });
};

export const getAllTransactions = async () => {
  return request('/transactions');
};

export const getTransactionsBySeller = async (sellerId) => {
  return request(`/transactions/seller/${sellerId}`);
};

export const getTransactionsByBuyer = async (buyerId) => {
  return request(`/transactions/buyer/${buyerId}`);
};

export const getTransactionStats = async () => {
  return request('/transactions/stats');
};
`);

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts.server = 'node server.js';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

const gitignorePath = path.join(root, '.gitignore');
let gitignore = fs.readFileSync(gitignorePath, 'utf8');
if (!gitignore.includes('.env')) {
  gitignore = gitignore.trim() + '\n.env\n';
  fs.writeFileSync(gitignorePath, gitignore, 'utf8');
}

console.log('Updated service modules, package.json, and .gitignore');
