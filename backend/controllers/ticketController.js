import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

export const createTicket = async (req, res) => {
  try {
    const {
      pnrNumber,
      trainNumber,
      trainName,
      source,
      destination,
      journeyDate,
      departureTime,
      arrivalTime,
      seatNumber,
      class: ticketClass,
      price,
      originalPrice,
      passengerDetails,
      ownerId,
      ownerName,
      ownerPhone,
    } = req.body;

    if (!pnrNumber || !trainNumber || !source || !destination || !price || !ownerId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const newTicket = new Ticket({
      id: uuidv4(),
      pnrNumber,
      trainNumber,
      trainName,
      source,
      destination,
      journeyDate,
      departureTime,
      arrivalTime,
      seatNumber,
      class: ticketClass,
      ownerId,
      ownerName,
      ownerPhone,
      status: 'PENDING',
      price,
      originalPrice: originalPrice || price,
      passengerDetails,
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      ticket: newTicket,
    });
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create ticket',
      error: error.message,
    });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: 'AVAILABLE' });
    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tickets',
      error: error.message,
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findOne({ id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ticket',
      error: error.message,
    });
  }
};

export const getPendingTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: 'PENDING' });
    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error('Get pending tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending tickets',
      error: error.message,
    });
  }
};

export const verifyTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { approve } = req.body;

    const ticket = await Ticket.findOne({ id });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    if (approve) {
      ticket.status = 'AVAILABLE';
      ticket.verifiedAt = new Date();
    } else {
      ticket.status = 'REJECTED';
    }

    await ticket.save();

    res.json({
      success: true,
      message: `Ticket ${approve ? 'verified' : 'rejected'} successfully`,
      ticket,
    });
  } catch (error) {
    console.error('Verify ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify ticket',
      error: error.message,
    });
  }
};

export const getAvailableTickets = async (req, res) => {
  try {
    const { source, destination, journeyDate, class: ticketClass } = req.query;
    const filters = { status: 'AVAILABLE' };

    if (source) filters.source = source;
    if (destination) filters.destination = destination;
    if (journeyDate) filters.journeyDate = journeyDate;
    if (ticketClass) filters.class = ticketClass;

    const tickets = await Ticket.find(filters);
    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error('Get available tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available tickets',
      error: error.message,
    });
  }
};

export const getTicketsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const tickets = await Ticket.find({ ownerId });

    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error('Get owner tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch owner tickets',
      error: error.message,
    });
  }
};

export const getTicketsByBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const tickets = await Ticket.find({ buyerId, status: 'BOOKED' });

    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error('Get buyer tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch buyer tickets',
      error: error.message,
    });
  }
};

export const bookTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { buyerId, buyerName, buyerPhone, passengerDetails } = req.body;

    const ticket = await Ticket.findOne({ id });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    if (ticket.status !== 'AVAILABLE') {
      return res.status(400).json({
        success: false,
        message: `Ticket cannot be booked. Current status: ${ticket.status}`,
      });
    }

    ticket.buyerId = buyerId;
    ticket.buyerName = buyerName;
    ticket.buyerPhone = buyerPhone;
    ticket.passengerDetails = passengerDetails;
    ticket.status = 'BOOKED';
    ticket.bookedAt = new Date();

    await ticket.save();

    res.json({
      success: true,
      message: 'Ticket booked successfully',
      ticket,
    });
  } catch (error) {
    console.error('Book ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book ticket',
      error: error.message,
    });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const ticket = await Ticket.findOneAndUpdate({ id }, updateData, { new: true });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.json({
      success: true,
      message: 'Ticket updated successfully',
      ticket,
    });
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update ticket',
      error: error.message,
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findOneAndDelete({ id });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.json({
      success: true,
      message: 'Ticket deleted successfully',
    });
  } catch (error) {
    console.error('Delete ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete ticket',
      error: error.message,
    });
  }
};
