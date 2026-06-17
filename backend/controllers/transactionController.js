import Transaction from '../models/Transaction.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

export const createTransaction = async (req, res) => {
  try {
    const {
      ticketId,
      ticketDetails,
      sellerId,
      sellerName,
      buyerId,
      buyerName,
      amount,
      paymentMethod,
    } = req.body;

    if (!ticketId || !sellerId || !buyerId || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const newTransaction = new Transaction({
      id: uuidv4(),
      ticketId,
      ticketDetails,
      sellerId,
      sellerName,
      buyerId,
      buyerName,
      amount,
      paymentMethod,
      paymentStatus: 'PENDING',
      transactionRef: `TXN-${Date.now()}`,
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      transaction: newTransaction,
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
      error: error.message,
    });
  }
};

export const completeTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { success } = req.body;

    const transaction = await Transaction.findOne({ id });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    if (success) {
      transaction.paymentStatus = 'SUCCESS';
      transaction.completedAt = new Date();

      // Update seller wallet
      const seller = await User.findOne({ id: transaction.sellerId });
      if (seller) {
        seller.walletBalance += transaction.amount;
        await seller.save();
      }
    } else {
      transaction.paymentStatus = 'FAILED';
    }

    await transaction.save();

    res.json({
      success: true,
      message: `Transaction ${success ? 'completed' : 'failed'} successfully`,
      transaction,
    });
  } catch (error) {
    console.error('Complete transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete transaction',
      error: error.message,
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message,
    });
  }
};

export const getTransactionsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const transactions = await Transaction.find({ sellerId });

    res.json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error('Get seller transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch seller transactions',
      error: error.message,
    });
  }
};

export const getTransactionsByBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const transactions = await Transaction.find({ buyerId });

    res.json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error('Get buyer transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch buyer transactions',
      error: error.message,
    });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ id });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    res.json({
      success: true,
      transaction,
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
      error: error.message,
    });
  }
};

export const getMyTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const myTransactions = await Transaction.find({
      $or: [{ buyerId: userId }, { sellerId: userId }],
    });

    res.json({
      success: true,
      transactions: myTransactions,
    });
  } catch (error) {
    console.error('Get my transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your transactions',
      error: error.message,
    });
  }
};
