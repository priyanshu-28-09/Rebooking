import express from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  getPendingTickets,
  verifyTicket,
  getAvailableTickets,
  getTicketsByOwner,
  getTicketsByBuyer,
  bookTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTicket);
router.get('/', optionalAuthMiddleware, getAllTickets);
router.get('/available', optionalAuthMiddleware, getAvailableTickets);
router.get('/pending', authMiddleware, getPendingTickets);
router.get('/owner/:ownerId', optionalAuthMiddleware, getTicketsByOwner);
router.get('/buyer/:buyerId', optionalAuthMiddleware, getTicketsByBuyer);
router.get('/:id', optionalAuthMiddleware, getTicketById);
router.patch('/:id/verify', authMiddleware, verifyTicket);
router.post('/:id/book', authMiddleware, bookTicket);
router.put('/:id', authMiddleware, updateTicket);
router.delete('/:id', authMiddleware, deleteTicket);

export default router;
