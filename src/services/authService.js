const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
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
  const response = await fetch(API_BASE_URL + path, options);
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
