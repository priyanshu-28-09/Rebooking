const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

export const getMyTransactions = async () => {
  return request('/transactions/my');
};

export const getTransactionsBySeller = async (sellerId) => {
  return request(`/transactions/seller/${sellerId}`);
};

export const getTransactionsByBuyer = async (buyerId) => {
  return request(`/transactions/buyer/${buyerId}`);
};

export const getTransactionById = async (transactionId) => {
  return request(`/transactions/${transactionId}`);
};
