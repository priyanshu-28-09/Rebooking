import express from 'express';
import {
  createTransaction,
  completeTransaction,
  getAllTransactions,
  getTransactionsBySeller,
  getTransactionsByBuyer,
  getTransactionById,
  getMyTransactions,
} from '../controllers/transactionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTransaction);
router.get('/', authMiddleware, getAllTransactions);
router.get('/my', authMiddleware, getMyTransactions);
router.get('/:id', authMiddleware, getTransactionById);
router.patch('/:id/complete', authMiddleware, completeTransaction);
router.get('/seller/:sellerId', authMiddleware, getTransactionsBySeller);
router.get('/buyer/:buyerId', authMiddleware, getTransactionsByBuyer);

export default router;
