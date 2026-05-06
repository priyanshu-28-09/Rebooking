import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ticketshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seller', 'buyer', 'admin'], required: true },
  walletBalance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  isBlocked: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

// Ticket Schema
const ticketSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  pnrNumber: { type: String, required: true },
  trainNumber: { type: String, required: true },
  trainName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  journeyDate: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  seatNumber: { type: String, required: true },
  class: { type: String, enum: ['Sleeper', '3A', '2A', '1A', 'General', 'CC'], required: true },
  ownerId: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'VERIFIED', 'AVAILABLE', 'BOOKED', 'REJECTED'], required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  buyerId: { type: String },
  buyerName: { type: String },
  buyerPhone: { type: String },
  passengerDetails: {
    name: String,
    age: Number,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  },
  createdAt: { type: Date, default: Date.now },
  verifiedAt: { type: Date },
  bookedAt: { type: Date },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ticketId: { type: String, required: true },
  ticketDetails: {
    pnrNumber: String,
    trainNumber: String,
    trainName: String,
    source: String,
    destination: String,
    journeyDate: String,
  },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], required: true },
  paymentMethod: { type: String, enum: ['WALLET', 'UPI', 'CARD', 'NET_BANKING'], required: true },
  transactionRef: { type: String },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Initialize with demo data
const initializeData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsers = [
        {
          id: 'admin-001',
          name: 'Admin User',
          email: 'admin@ticketshare.com',
          phone: '9999999999',
          password: 'admin123',
          role: 'admin',
          walletBalance: 0,
        },
        {
          id: 'seller-001',
          name: 'Rajesh Kumar',
          email: 'rajesh@example.com',
          phone: '9876543210',
          password: 'seller123',
          role: 'seller',
          walletBalance: 1500,
        },
        {
          id: 'buyer-001',
          name: 'Priya Sharma',
          email: 'priya@example.com',
          phone: '9876543211',
          password: 'buyer123',
          role: 'buyer',
          walletBalance: 5000,
        },
      ];
      await User.insertMany(defaultUsers);
      console.log('Demo users initialized');
    }

    const ticketCount = await Ticket.countDocuments();
    if (ticketCount === 0) {
      const demoTickets = [
        {
          id: 'ticket-001',
          pnrNumber: '2847563291',
          trainNumber: '12301',
          trainName: 'Rajdhani Express',
          source: 'New Delhi',
          destination: 'Mumbai Central',
          journeyDate: '2025-01-05',
          departureTime: '16:55',
          arrivalTime: '08:35',
          seatNumber: 'A1-45',
          class: '2A',
          ownerId: 'seller-001',
          ownerName: 'Rajesh Kumar',
          ownerPhone: '9876543210',
          status: 'AVAILABLE',
          price: 800,
          originalPrice: 1500,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          verifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'ticket-002',
          pnrNumber: '3928471563',
          trainNumber: '12951',
          trainName: 'Mumbai Rajdhani',
          source: 'Mumbai Central',
          destination: 'New Delhi',
          journeyDate: '2025-01-08',
          departureTime: '17:00',
          arrivalTime: '08:35',
          seatNumber: 'B2-22',
          class: '3A',
          ownerId: 'seller-001',
          ownerName: 'Rajesh Kumar',
          ownerPhone: '9876543210',
          status: 'AVAILABLE',
          price: 600,
          originalPrice: 1200,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          verifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
      ];
      await Ticket.insertMany(demoTickets);
      console.log('Demo tickets initialized');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Helper: parse demo token and load user
const getUserFromToken = async (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !token.startsWith('jwt-token-')) {
    return null;
  }
  const userId = token.replace('jwt-token-', '');
  return User.findOne({ id: userId });
};

app.get('/api/auth/me', async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    if (user.isBlocked) {
      return res.status(403).json({ success: false, message: 'Your account has been blocked' });
    }
    const token = 'jwt-token-' + user.id; // Simple token for demo
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ success: true, message: 'Login successful', user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email or phone already registered' });
    }
    const newUser = new User({
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      password,
      role,
      walletBalance: role === 'buyer' ? 10000 : 0,
    });
    await newUser.save();
    const token = 'jwt-token-' + newUser.id;
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.json({ success: true, message: 'Registration successful', user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/tickets/pending', async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: 'PENDING' });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/tickets/available', async (req, res) => {
  try {
    const { source, destination, journeyDate, class: ticketClass } = req.query;
    const query = { status: 'AVAILABLE' };
    if (source) query.source = source;
    if (destination) query.destination = destination;
    if (journeyDate) query.journeyDate = journeyDate;
    if (ticketClass && ticketClass !== 'all') query.class = ticketClass;
    const tickets = await Ticket.find(query);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/tickets/owner/:ownerId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ ownerId: req.params.ownerId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/tickets/buyer/:buyerId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ buyerId: req.params.buyerId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/tickets', async (req, res) => {
  try {
    const ticket = new Ticket({
      id: `ticket-${Date.now()}`,
      ...req.body,
      status: 'PENDING',
      createdAt: new Date(),
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/tickets/:id/book', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ id: req.params.id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    if (ticket.status !== 'AVAILABLE') {
      return res.status(400).json({ success: false, message: 'Ticket is not available for booking' });
    }
    ticket.status = 'BOOKED';
    ticket.buyerId = req.body.buyerId;
    ticket.buyerName = req.body.buyerName;
    ticket.buyerPhone = req.body.buyerPhone;
    ticket.passengerDetails = req.body.passengerDetails;
    ticket.bookedAt = new Date();
    await ticket.save();
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/tickets/:id/verify', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ id: req.params.id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    ticket.status = req.body.approve ? 'AVAILABLE' : 'REJECTED';
    ticket.verifiedAt = new Date();
    await ticket.save();
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/transactions/seller/:sellerId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ sellerId: req.params.sellerId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/transactions/buyer/:buyerId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ buyerId: req.params.buyerId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/transactions/stats', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const totalTransactions = transactions.length;
    const successfulTransactions = transactions.filter((txn) => txn.paymentStatus === 'SUCCESS').length;
    const totalRevenue = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);
    const pendingAmount = transactions
      .filter((txn) => txn.paymentStatus === 'PENDING')
      .reduce((sum, txn) => sum + (txn.amount || 0), 0);
    res.json({ totalTransactions, successfulTransactions, totalRevenue, pendingAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const transaction = new Transaction({
      id: `transaction-${Date.now()}`,
      ...req.body,
      paymentStatus: 'PENDING',
      transactionRef: `TXN-${Date.now()}`,
      createdAt: new Date(),
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/transactions/:id/complete', async (req, res) => {
  try {
    const { success } = req.body;
    const transaction = await Transaction.findOne({ id: req.params.id });
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    transaction.paymentStatus = success ? 'SUCCESS' : 'FAILED';
    transaction.completedAt = new Date();
    await transaction.save();
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/users/:id/wallet', async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findOneAndUpdate({ id: req.params.id }, { $inc: { walletBalance: amount } }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/users/:id/block', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeData();
});