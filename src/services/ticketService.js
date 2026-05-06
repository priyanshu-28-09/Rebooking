const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

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
  return request('/tickets/available?' + params.toString());
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
