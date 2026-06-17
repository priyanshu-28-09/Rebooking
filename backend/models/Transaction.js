import mongoose from 'mongoose';

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

export default mongoose.model('Transaction', transactionSchema);
